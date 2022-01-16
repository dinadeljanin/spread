import React from 'react'

import styled from 'styled-components'

import chainlinkLogo from '../../../assets/images/tokens/chainlink-cube.png'
import Link from '../atoms/Link'

const ApeTogether = styled.div`
  font-size: 1.5em;
`

const ChainlinkLogo = styled.img`
  height: 1.5em;
  margin-left: 5px;
`

const Footer = () => {
  return (
    <footer>
      <p>
        Powered by <Link link='https://www.coingecko.com/en/api/documentation' name='CoinGecko'>CoinGecko</Link>
      </p>
      <div>
        <ChainlinkLogo src={chainlinkLogo} />
        <ApeTogether>🤝🦍</ApeTogether>
      </div>
    </footer>
  )
}

export default Footer
