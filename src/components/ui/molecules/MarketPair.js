import React, { useState, useContext } from 'react'

import AggregatorV3InterfaceABI from '@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json'
import { ethers } from 'ethers'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { EthProvider } from '../../../context'
import { COLORS } from '../../../theme/ColorPalette'
import { wrap } from '../../../theme/Snippets'
import { formatToFiat } from '../../../utils'
import Loader from '../atoms/Loader'

const { eerieBlack } = COLORS

const Wrap = styled.div`
  ${wrap}
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  position: relative;
  display: grid;
  place-items: center;
  a {
    height: fit-content;
    border-radius: 15px;
    width: 220px;
    padding: 1em;
    display: grid;
    grid-gap: 0.75em .25em;
    grid-template-columns: 25px auto;
    grid-template-rows: auto auto;
    grid-template-areas:
    'logo name'
    'price price';
  }
  h3 {
    text-decoration: none;
    grid-area: name;
    text-transform: capitalize;
    align-self: center;
    font-size: 1em;
    line-height: 25px;
    color: ${eerieBlack};
  }
  img {
    border: 1px solid #000;
    border-radius: 50%;
    padding: 2px;
    height: 20px;
    width: 20px;
    align-self: center;
    grid-area: logo;
  }
  p {
    font-weight: 400;
    font-style: normal;
    grid-area: price;
    font-size: 25px;
  }
  ${({ provider }) => !provider && css`
    cursor: not-allowed;
    user-select: none;
    a {
      pointer-events: none;
    }
  `}
  @media (min-width: 500px) and (max-width: 1300px) {
    width: 200px;
  }
`

const TokenPair = ({ pairData }) => {
  const { provider, user } = useContext(EthProvider)
  const { address } = user
  const { name, pair, palette, image, priceFeed_address } = pairData

  const [priceFeedData, setPriceFeedData] = useState(0)

  try {
    if (address) {
      const addr = priceFeed_address
      const priceFeed = new ethers.Contract(addr, AggregatorV3InterfaceABI, provider)
      priceFeed.latestRoundData().then((roundData) => {
        setPriceFeedData(formatToFiat(roundData.answer, 8))
      })
    }
  } catch (e) {
    console.log(e)
  }

  return (
    <Wrap border={palette} provider={provider}>
      <Link to={provider ? pair : '/'}>
      <img alt={name} src={image} />
      <h3>{name.split('-')[0]}</h3>
      <p>{ priceFeedData || <Loader /> }</p>
      </Link>
    </Wrap>
  )
}

export default TokenPair
