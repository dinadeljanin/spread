import React, { useContext, useRef, useEffect, useState } from 'react'

import dateFormat from 'dateformat'
import { ethers } from 'ethers'
import _ from 'lodash'
import { lighten, darken } from 'polished'
import styled, { css } from 'styled-components'
import timestamp from 'unix-timestamp'

import { TOKEN_PAIRS } from '../../constants/TokenPairs'
import { EthProvider } from '../../context'
import { COLORS } from '../../theme/ColorPalette'
import { formatToFiat, smolNumberify } from '../../utils'
import Chart from '../Chart'
import ChallengeBetForm from '../ui/templates/forms/ChallengeBetForm'
import EnableAllowanceForm from '../ui/templates/forms/EnableAllowanceForm'
import SettleBetForm from '../ui/templates/forms/SettleBetForm'

const { eerieBlack } = COLORS

const Section = styled.section`
  display: grid;
  width: 90%;
  height: fit-content;
  grid-gap: 0 1.5em;
  grid-template:
  'header header' auto
  'chart form' auto;
  header {
    margin: 0;
    padding: 0;
    padding-bottom: 1em;
    background-color: transparent;
    height: fit-content;
    border-bottom: none;
    width: fit-content;
    grid-area: header;
    > h1 {
      padding-bottom: 0em;
      margin-left: .5em;
      margin-left: 5px;
      text-transform: none;
      color: ${lighten(0.35, eerieBlack)};
      span:nth-of-type(1) { text-transform: uppercase; }
      span:nth-of-type(2n + 1) { color: ${eerieBlack}; }
      span:nth-of-type(2) {
        color: ${darken(0.15, '#6cd47b')};
        ${({ sentiment }) => !sentiment && css`
          color: ${darken(0.1, '#fe5a58')};
        `}
      }
    }
    > img {
      padding: 2px;
      border: 2px solid #000;
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }
  @media (min-width: 1200px) {
    margin: 0 auto;
    grid-template:
      'header header'
      'chart form';
    grid-template-columns: calc(100% - 460px - 1.5em) auto;
    grid-template-rows: auto auto;
  }
`

const Bet = ({ bet, betIndex }) => {
  const sectionRef = useRef()
  const { user } = useContext(EthProvider)
  const { address, allowance, balance } = user

  const [tokenPair, setTokenPair] = useState({})
  useEffect(() => {
    const pair = _.find(
      TOKEN_PAIRS,
      (tokenPair) => tokenPair.priceFeed_address === bet.priceFeed.toLowerCase()
    )
    setTokenPair(pair)
  }, [bet])

  const { name, pair, api_id, image, palette } = tokenPair
  const { spreadPrice, bullish, settlementDate, betCreator, betChallenger } = bet

  const renderForm = () => {
    switch (true) {
      case allowance === 0 || balance === 0:
        return <EnableAllowanceForm />
      // Makes it so that the bet creator can't challenge their own bet
      case allowance > 0 && address !== betCreator.toLowerCase() && betChallenger === ethers.constants.AddressZero:
        return (
          <ChallengeBetForm
            bet={bet}
            betIndex={betIndex}
            showButton={true}
            tokenPair={tokenPair} />
        )
      case allowance > 0 && address === betCreator.toLowerCase():
      case allowance > 0 && address === betChallenger.toLowerCase():
      default:
        return (
          <SettleBetForm
            bet={bet}
            betIndex={betIndex}
            tokenPair={tokenPair} />
        )
    }
  }

  return (
    <Section sentiment={bullish}>
      <header>
        <img alt={`Logo for ${name}`} src={image} />
        <h1>
          <span>{pair}</span>{' '}
          to hit{' '}
          <span>{formatToFiat(spreadPrice)}</span>{' '}
          by{' '}
          <span>{dateFormat(timestamp.toDate(smolNumberify(settlementDate, 0)), 'mediumDate')}</span>
        </h1>
      </header>
      <Chart apiId={api_id} color={palette} reference={sectionRef} />
      {renderForm()}
    </Section>
  )
}

export default Bet
