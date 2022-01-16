import React, { useContext } from 'react'

import { ethers } from 'ethers'

import { CHALLENGE_BET_FEEDBACK } from '../../../../constants/TransactionFeedback'
import { EthProvider } from '../../../../context'
import { smolNumberify } from '../../../../utils'
import Wager from '../../atoms/Wager'
import Betters from '../../molecules/Betters'
import FauxForm from '../../molecules/FauxForm'

const ChallengeBetForm = ({ bet, betIndex, showButton }) => {
  const { initiated, success } = CHALLENGE_BET_FEEDBACK
  const { betCreator, betChallenger, betSize, bullish } = bet
  const { user, contracts, dispatch } = useContext(EthProvider)
  const { address } = user
  const { dai, spread } = contracts

  const challengeBet = async (e) => {
    e.preventDefault()

    const details = {
      address,
      betSize: smolNumberify(betSize),
      sentiment: !bullish ? 'Bullish' : 'Bearish'
    }

    const initiatedSummary = {
      ...initiated,
      details
    }

    dispatch({ type: 'PLACE_BET', payload: initiatedSummary })

    const challengeBet = await spread.challengeBet(betIndex)
    await challengeBet.wait()

    const successSummary = {
      ...success,
      details: {
        ...details,
        trxHash: challengeBet.hash
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
  }

  return (
    <FauxForm
      action='Challenge'
      handleSubmit={challengeBet}
      isChallenged={betChallenger !== ethers.constants.AddressZero}
      showButton={showButton}>
      <Betters
        challenger={betChallenger}
        creator={betCreator} />
      <Wager
        betSize={betSize}
        isChallenged={betChallenger !== ethers.constants.AddressZero} />
    </FauxForm>
  )
}

export default ChallengeBetForm
