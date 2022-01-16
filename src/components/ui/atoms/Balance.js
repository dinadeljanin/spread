import React, { useContext } from 'react'

import { ethers } from 'ethers'
import { lighten, darken } from 'polished'
import styled, { css } from 'styled-components'

import dai from '../../../assets/images/tokens/dai.png'
import { EthProvider } from '../../../context'
import { COLORS } from '../../../theme/ColorPalette'

const { eerieBlack } = COLORS

const Wrap = styled.div`
  border-radius: 10px;
  border: 2px solid #000;
  background-color: #fff;
  padding: 0.5em;
  ${({ type }) => !type && css`
    background-color: ${darken(0.04, '#fff')};
    border: none;
  `}
  > p {
    color: ${lighten(0.45, eerieBlack)};
    margin-bottom: .5em;
    font-family: 'Open Sauce Sans Regular';
  }
  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    p {
      color: ${lighten(0.20, eerieBlack)};
      font-size: 35px;
      height: fit-content;
    }
    img {
      height: 25px;
      width: 25px;
      margin-left: 10px;
      margin-bottom: 5px;
      padding: 0;
    }
  }
`

const Balance = ({ header = null, type = null }) => {
  const { user } = useContext(EthProvider)
  const { allowance, balance } = user

  const renderBalance = () => {
    if (balance > allowance && allowance > 0) {
      return ethers.utils.commify(allowance)
    } else {
      return ethers.utils.commify(balance)
    }
  }

  return (
    <Wrap type={type}>
      <p>{header || 'Available Balance'}</p>
      <div>
        {!type && <p>{renderBalance()}</p>}
        {type && type === 'allowance' && <p>{ethers.utils.commify(parseInt(allowance))}</p>}
        {type && type === 'balance' && <p>{ethers.utils.commify(parseInt(balance))}</p>}
        <img alt="Dai Logo" src={dai} />
      </div>
    </Wrap>
  )
}

export default Balance
