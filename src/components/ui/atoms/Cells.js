import React from 'react'

import { ethers } from 'ethers'
import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import dai from '../../../assets/images/tokens/dai.png'
import { boxSizing } from '../../../theme/Snippets'

const LabelWrap = styled.div`
  text-align: center;
  ${({ label }) => label === 'Token' && css` width: 250px; text-align: left; `}
  ${({ label }) => label === 'Target Price' && css` width: 150px; `}
  ${({ label }) => label === 'Market' && css` width: 125px; `}
  ${({ label }) => label === 'Sentiment' && css` width: 150px; `}
  ${({ label }) => label === 'Settle Date' && css` width: 150px; `}
  ${({ label }) => label === 'Wager' && css` width: 150px; `}
  ${({ label }) => label === 'Creator' && css` width: 150px; `}
  ${({ label }) => label === 'Challenger' && css` width: 150px; `}
  p {
    color: ${lighten(0.35, '#000')};
  }
`

const CellWrap = styled.div`
  width: 150px;
  text-align: center;
 ${({ type }) => type === 'Token' && css`
   display: flex;
   flex-direction: row;
   align-items: center;
   width: 250px;
   > p {
     margin-left: 10px;
   }
   > img {
     padding: 2px;
     border: 2px solid #000;
     border-radius: 50%;
     height: 30px;
     width: 30px;
   }
 `}
 ${({ type }) => type === 'Market' && css`
    width: 125px;
    p {
      color: ${lighten(0.35, '#000')};
      text-transform: uppercase;
    }
 `}
 ${({ type }) => type === 'Sentiment' && css`
    div {
      ${boxSizing}
      margin: 0 auto;
      width: 60%;
      text-align: center;
      padding: 0.3em;
      border-radius: 5px;
      border: 2px solid #000;
      ${({ value }) => value === 'Bearish' && css`
        background-color: #fe5a58;
      `}
      ${({ value }) => value === 'Bullish' && css`
        background-color: #6cd47b;
      `}
    }
 `}
 ${({ type }) => type === 'Wager' && css`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
   img {
     position: relative;
     bottom: 0.1em;
     height: 16px;
     margin-left: 4px;
   }
 `}
 ${({ type }) => type === 'Address Zero' && css`
   p {
     color: ${lighten(0.5, '#000')};
   }
 `}
`

export const Label = ({ label }) => {
  return (
    <LabelWrap label={label}>
      <p>{label}</p>
    </LabelWrap>
  )
}

export const Cell = ({ type, value }) => {
  switch (type) {
    case 'Token':
      return (
        <CellWrap type={type}>
          {<img alt={`${value.name} Logo`} src={value.image} />}
          <p>{value.name}</p>
        </CellWrap>
      )
    case 'Sentiment':
      return (
        <CellWrap type={type} value={value}>
          <div>
            <p>{value}</p>
          </div>
        </CellWrap>
      )
    case 'Market':
    case 'Price':
      return (
        <CellWrap type={type}>
          <p>{value}</p>
        </CellWrap>
      )
    case 'Wager':
      return (
        <CellWrap type={type}>
          <p>{value}</p>
          <img alt="Dai" src={dai} />
        </CellWrap>
      )
    case 'Address Zero':
      return (
        <CellWrap type={type}>
          <p>{value}</p>
        </CellWrap>
      )
    default:
      return (
        <CellWrap>
          <p>{value}</p>
        </CellWrap>
      )
  }
}
