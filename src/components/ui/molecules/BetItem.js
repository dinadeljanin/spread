import React, { useEffect, useState } from 'react'

import dateFormat from 'dateformat'
import { ethers } from 'ethers'
import _ from 'lodash'
import Numeral from 'numeral'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import timestamp from 'unix-timestamp'

import { TOKEN_PAIRS } from '../../../constants/TokenPairs'
import { boxSizing, wrap } from '../../../theme/Snippets'
import { formatToFiat, formatAddress, smolNumberify } from '../../../utils'
import { Cell } from '../atoms/Cells'

const Wrap = styled.div`
  ${wrap}
  border-radius: 15px;
  overflow: hidden;
  margin: 1em 0;
  a {
    ${boxSizing}
    padding: 1.5em;
    height: fit-content;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  ${({ isSettled }) => isSettled && css`
    filter: grayscale(50%);
    user-select: none;
  `}
`

const BetItem = ({ path, bet }) => {
  const [tokenPair, setTokenPair] = useState({})
  useEffect(() => {
    const pair = _.find(
      TOKEN_PAIRS,
      (tokenPair) => tokenPair.priceFeed_address === bet.priceFeed.toLowerCase()
    )
    setTokenPair(pair)
  }, [bet])

  const { image, name, pair } = tokenPair
  const { spreadPrice, bullish, settlementDate, betCreator, betChallenger, betSize, isSettled } = bet

  return (
    <Wrap isSettled={isSettled}>
      <Link to={`/${path}`}>
        <Cell type='Token' value={{ image, name }}/>
        <Cell type='Market' value={pair} />
        <Cell value={formatToFiat(spreadPrice)} />
        <Cell value={dateFormat(timestamp.toDate(smolNumberify(settlementDate, 0)), 'mediumDate')}/>
        <Cell type='Sentiment' value={bullish ? 'Bullish' : 'Bearish'} />
        <Cell type='Wager' value={Numeral(smolNumberify(betSize)).format('0,0.00')} />
        <Cell value={formatAddress(betCreator)} />
        <Cell type={betChallenger === ethers.constants.AddressZero ? 'Address Zero' : ''} value={formatAddress(betChallenger)} />
      </Link>
    </Wrap>
  )
}

export default BetItem
