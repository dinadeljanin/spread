import React, { useContext } from 'react'

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import styled, { css } from 'styled-components'

import { EthProvider } from '../../../context'
import { formatAddress } from '../../../utils'

const Wrap = styled.div`
  align-items: center;
  border-radius: 50px;
  border: 2px solid #000;
  display: flex;
  background-color: #fff;
  flex-direction: row;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 8px;
  padding: 0.5em 0.75em;
  p {
    font-size: 16px;
    line-height: 16px;
  }
`

const JazziconWrap = styled.div`
  border: 1px solid #000;
  border-radius: 50%;
  height: 20px;
  margin-left: .5rem;
  overflow: hidden;
  padding: 2px;
  width: 20px;
  > img {
    border-radius: 50%;
    height: 20px;
    width: 20px;
  }
  ${({ chainId }) => chainId !== 31337 && css`
    border: 1px solid #FE4A4A;
  `}
`

const Account = () => {
  const { user, chainId } = useContext(EthProvider)
  const { address } = user

  return (
    <Wrap>
      <p>{formatAddress(address)}</p>
      <JazziconWrap chainId={chainId}>
        <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
      </JazziconWrap>
    </Wrap>
  )
}

export default Account
