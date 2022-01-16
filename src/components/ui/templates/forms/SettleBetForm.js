import React, { useContext, useEffect, useState } from 'react'

import { ethers } from 'ethers'
import _ from 'lodash'
import timestamp from 'unix-timestamp'

import { SETTLE_BET_FEEDBACK } from '../../../../constants/TransactionFeedback'
import { EthProvider } from '../../../../context'
import { smolNumberify } from '../../../../utils'
import Wager from '../../atoms/Wager'
import Betters from '../../molecules/Betters'
import FauxForm from '../../molecules/FauxForm'
import SettleCountdown from '../../molecules/SettleCountdown'

timestamp.round = true

const SettleBetForm = ({ bet, betIndex }) => {
  const { initiated, pending, success } = SETTLE_BET_FEEDBACK
  const [disabled, setDisabled] = useState(true)
  const { betCreator, betChallenger, betSize, settlementDate, bullish } = bet
  const { user, contracts, dispatch } = useContext(EthProvider)
  const { address } = user
  const { spread } = contracts

  const isChallenged = betChallenger !== ethers.constants.AddressZero
  const settleTimestamp = smolNumberify(settlementDate, 0)

  useEffect(() => {
    if (settleTimestamp < timestamp.now()) {
      setDisabled(false)
    }
  }, [])

  const settleBet = async (e) => {
    e.preventDefault()
    if (settleTimestamp < timestamp.now()) {
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

      const settleBet = await spread.settleBet(betIndex)
      dispatch({ type: 'PLACE_BET', payload: { ...pending, details } })
      // modal in between for pending
      await settleBet.wait()
      const successSummary = {
        ...success,
        details: {
          ...details,
          trxHash: settleBet.hash
        }
      }
      dispatch({ type: 'PLACE_BET', payload: successSummary })
      const bets = await spread.fetchBets()
      dispatch({ type: 'SET_BETS', payload: bets })
    }
  }

  return (
    <FauxForm
      action='Settle'
      disabled={disabled}
      handleSubmit={settleBet}
      isChallenged={betChallenger !== ethers.constants.AddressZero}
      showBalance={false}
      showButton={address === betChallenger.toLowerCase() || address === betCreator.toLowerCase()}>
      <SettleCountdown
        timestamp={settleTimestamp}
      />
      <Betters
        challenger={betChallenger}
        creator={betCreator} />
      <Wager
        betSize={betSize}
        isChallenged={isChallenged} />
    </FauxForm>
  )
}

export default SettleBetForm
