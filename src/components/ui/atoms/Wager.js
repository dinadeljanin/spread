import React from 'react'

import { ethers } from 'ethers'
import { lighten, darken } from 'polished'
import styled from 'styled-components'

import dai from '../../../assets/images/tokens/dai.png'
import { COLORS } from '../../../theme/ColorPalette'
import { smolNumberify } from '../../../utils'

const { eerieBlack } = COLORS

const Wrap = styled.div`
  border-radius: 10px;
  background-color: ${darken(0.075, '#fff')};
  border: 2px solid ${lighten(0.75, '#000')};
  padding: 0.5em;
  margin-bottom: 0.5em;
  > p, span {
    color: ${lighten(0.35, eerieBlack)};
    margin-bottom: .5em;
  }
  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    p {
      font-size: 30px;
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

const Wager = ({ betSize, isChallenged }) => {
  const wager = smolNumberify(betSize)
  return (
    <Wrap>
      <p>Pool</p>
      <div>
        {isChallenged
          ? <p>{ethers.utils.commify(wager * 2)}</p>
          : <p>
              <span>{ethers.utils.commify(wager)}/</span>
              {ethers.utils.commify(wager * 2)}
            </p>
        }
        <img alt="Dai Logo" src={dai}/>
      </div>
    </Wrap>
  )
}

export default Wager
