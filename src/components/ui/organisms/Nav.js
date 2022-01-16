import React, { useContext } from 'react'

import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import barChart from '../../../assets/svg/barchart.svg'
import trophy from '../../../assets/svg/trophy.svg'
import userIcon from '../../../assets/svg/user.svg'
import { EthProvider } from '../../../context'
import NavLink from '../atoms/NavLink'

const Wrap = styled.ul`
  height: fit-content;
  margin: 0;
  padding: 0;
  padding-bottom: 0.15em;
`

const Nav = () => {
  const { user } = useContext(EthProvider)
  const { address } = user
  const location = useLocation()

  const navLinks = [
    { page: 'Dashboard', path: `/${address}`, icon: userIcon },
    { page: 'Markets', path: '/', icon: barChart },
    { page: 'Bets', path: '/bets', icon: trophy }

  ]

  return (
    <nav>
      <Wrap>
        {address && navLinks.map((link, idx) =>
          <NavLink key={`Nav link no. ${idx}`} link={link} location={location} />
        )}
      </Wrap>
    </nav>
  )
}

export default Nav
