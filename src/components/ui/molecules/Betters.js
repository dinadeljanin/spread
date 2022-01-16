import React from 'react'

import { ethers } from 'ethers'
import { lighten, darken } from 'polished'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import styled, { css } from 'styled-components'

import { COLORS } from '../../../theme/ColorPalette'
import { formatAddress } from '../../../utils'
const { eerieBlack } = COLORS

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
`

const Better = styled.div`
  height: fit-content;
  border: 2px solid ${lighten(0.75, '#000')};
  width: 48.5%;
  background-color: ${darken(0.075, '#fff')};
  border-radius: 10px;
  padding: 0.5em;
  box-sizing: border-box;
  > p:first-of-type {
    color: ${lighten(0.35, eerieBlack)};
    font-size: 1em;
  }
  > div {
    margin: 0.5em 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    p {
      font-size: 1.2em;
      line-height: 16px;
    }
  }
  ${({ isChallenged }) => isChallenged && css`
    > div {
      p {
        color: ${lighten(0.35, eerieBlack)};
      }
    }
  `}
`

const JazziconWrap = styled.div`
  border: 1px solid #000;
  border-radius: 50%;
  height: 15px;
  overflow: hidden;
  margin-right: 5px;
  padding: 2px;
  width: 15px;
  > img {
    border-radius: 50%;
    height: 15px;
    width: 15px;
  }
`

const Betters = ({ challenger, creator }) => {
  return (
    <Wrap>
      <Better>
        <p>Wagerer</p>
        <div>
          <JazziconWrap>
            <Jazzicon diameter={15} seed={jsNumberForAddress(creator)} />
          </JazziconWrap>
          <p>{formatAddress(creator)}</p>
        </div>
      </Better>
      <Better isChallenged={challenger === ethers.constants.AddressZero}>
        <p>Caller</p>
        <div>
          <JazziconWrap>
            <Jazzicon diameter={15} seed={jsNumberForAddress(challenger)} />
          </JazziconWrap>
          <p>{formatAddress(challenger)}</p>
        </div>
      </Better>
    </Wrap>
  )
}

export default Betters
