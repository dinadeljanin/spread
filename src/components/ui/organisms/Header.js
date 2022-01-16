import React, { useContext } from 'react'

import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import spread from '../../../assets/images/spread.png'
import { EthProvider } from '../../../context'
import Account from '../atoms/Account'
import ConnectButton from '../atoms/ConnectButton'
import { MetaMaskButton } from '../molecules/LinkButtons'

const Wordmark = styled.img`
  height: 40px;
  user-select: none;
  @media (min-width: 1000px) {
    height: 55px;
  }
`

const Header = () => {
  const { provider, user } = useContext(EthProvider)
  const { address } = user

  const checkConnection = () => {
    switch (true) {
      case provider && address !== '':
        return <Account />
      case provider !== null:
      case provider && isMobile:
        return <ConnectButton />
      case !provider && isMobile:
        return null
      case !provider:
        return <MetaMaskButton />
      default:
        return null
    }
  }

  return (
    <header>
      <Link to='/'>
        <Wordmark alt='Wordmark' src={spread} />
      </Link>
      {checkConnection()}
    </header>
  )
}

export default Header
