import React from 'react'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import appStore from '../../../assets/svg/appStore.svg'
import etherscan from '../../../assets/svg/etherscan-dark.svg'
import googlePlayBadge from '../../../assets/svg/google-play-badge.svg'
import metamask from '../../../assets/svg/metamask.svg'
import { tap, hover } from '../../../theme/FramerVariants'
import Link from '../atoms/Link'

const BrowserWrap = styled(motion.div)`
  padding: .5em 1em;
  background-size: cover;
  width: fit-content;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid #000;
  background-color: #fff;
  border-radius: 25px;
  > a {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 16px;
    color: #000;
    text-decoration: none;
    > img {
      margin: 0 10px 0 0;
      height: 25px;
      width: 25px;
    }
  }
`

const MobileWrap = styled.div`
  padding: .5em .75em;
  img {
    height: 2.75rem;
  }
`

export const LinkButton = ({ image, link, name, palette = null, type }) => {
  switch (type) {
    case 'browser':
      return (
        <BrowserWrap
          palette={palette}
          whileHover={hover}
          whileTap={tap}>
          <Link link={link} name={name}>
            <img alt={`Logo for ${name}`} src={image} />
            {name}
          </Link>
        </BrowserWrap>
      )
    case 'mobile':
      return (
        <MobileWrap>
          <Link link={link} name={name}>
            <img alt={`Logo for ${name}`} src={image}/>
          </Link>
        </MobileWrap>
      )
    default: break
  }
}

export const MetaMaskButton = () => {
  return (
    <LinkButton
      image={metamask}
      link='https://metamask.io'
      name='Install Metamask'
      palette='metamask'
      type='browser'
    />
  )
}

export const EtherscanButton = ({ trxHash }) => {
  return (
      <LinkButton
        image={etherscan}
        link={`https://etherscan.io/tx/${trxHash}`}
        name='View this transaction on Etherscan'
        palette='etherscan'
        type='browser'
      />
  )
}

export const AppStoreBadge = () => {
  return (
    <LinkButton
      image={appStore}
      link='https://metamask.app.link/skAH3BaF99'
      name='Install MetaMask Mobile'
      type='mobile'
    />
  )
}

export const GooglePlayBadge = () => {
  return (
    <LinkButton
      image={googlePlayBadge}
      link='https://metamask.app.link/bxwkE8oF99'
      name='Install MetaMask Mobile'
      type='mobile'
    />
  )
}
