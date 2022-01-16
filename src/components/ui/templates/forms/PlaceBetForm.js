import React, { useContext, useState, useRef } from 'react'

import styled from 'styled-components'
import timestamp from 'unix-timestamp'

import { PLACE_BET_FEEDBACK } from '../../../../constants/TransactionFeedback'
import { EthProvider } from '../../../../context'
import { smolNumberify, bigNumberify } from '../../../../utils'
import FormButton from '../../atoms/FormButton'
import Form from '../../molecules/Form'
import { AmountInput, DateInput, PriceInput } from '../../molecules/Input'
import Toggle from '../../molecules/Toggle'

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const PlaceBetForm = ({ pairData }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const { initiated, success, rejection } = PLACE_BET_FEEDBACK
  const { user, contracts, dispatch } = useContext(EthProvider)
  const { address, allowance, balance } = user
  const { priceFeed_address, heartbeat } = pairData
  const { dai, spread } = contracts

  const wagerRef = useRef()
  const targetRef = useRef()
  const dateRef = useRef()

  const labels = ['Bullish', 'Bearish']

  const setMaxWager = (e) => {
    e.preventDefault()

    if (balance > allowance && allowance > 0) {
      wagerRef.current.value = allowance
    } else {
      wagerRef.current.value = balance
    }
  }

  const placeBet = async (e) => {
    e.preventDefault()
    console.log('this fires')

    const betSize = wagerRef.current.value
    const priceFeedAddress = priceFeed_address
    const sentiment = selectedTab === 0
    const settleDate = dateRef.current.input.value
    const targetPrice = targetRef.current.value

    const details = {
      address,
      betSize,
      targetPrice,
      settleDate: dateRef.current.input.value,
      sentiment: labels[selectedTab],
      priceFeedAddress
    }

    const initiatedSummary = {
      ...initiated,
      details
    }

    dispatch({ type: 'PLACE_BET', payload: initiatedSummary })

    try {
      const betSizetoBN = bigNumberify(betSize)
      const spreadPricetoBN = bigNumberify(targetPrice)
      const settleDateTimeStamp = timestamp.fromDate(settleDate)

      const createBet = await spread.createBet(priceFeedAddress, sentiment, betSizetoBN, heartbeat, spreadPricetoBN, settleDateTimeStamp)

      await createBet.wait()

      const successSummary = {
        ...success,
        details: {
          ...details,
          trxHash: createBet.hash
        }
      }

      const allowance = await dai.allowance(user.address, spread.address)
      const balance = await dai.balanceOf(address)

      dispatch({
        type: 'TRANSACTION_UPDATE',
        payload: {
          balance: smolNumberify(balance),
          allowance: smolNumberify(allowance)
        }
      })
      dispatch({ type: 'PLACE_BET', payload: successSummary })
      const bets = await spread.fetchBets()
      dispatch({ type: 'SET_BETS', payload: bets })
      wagerRef.current.value = ''
      dateRef.current.input.value = ''
      targetRef.current.value = ''
    } catch (e) {
      if (e.code === 4001) {
        dispatch({ type: 'PLACE_BET', payload: rejection })
      }
    }
  }

  return (
    <Form handleSubmit={placeBet}>
        <Toggle
          labels={labels}
          selectedTab={selectedTab}
          toggleTab={setSelectedTab} />
        <InputWrap>
          <PriceInput reference={targetRef} />
          <DateInput reference={dateRef} />
        </InputWrap>
        <AmountInput
          handleMax={setMaxWager}
          reference={wagerRef} />
        <FormButton action='Stake' />
    </Form>
  )
}

export default PlaceBetForm
