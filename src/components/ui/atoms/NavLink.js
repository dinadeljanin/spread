import React from 'react'

import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { wrap, boxSizing } from '../../../theme/Snippets'

const Wrap = styled.li`
  ${wrap}
  ${boxSizing}
  width: 40px;
  margin: 1.5em auto;
  border-radius: 10px;
  box-shadow: none;
  text-align: center;
  list-style-type: none;
  box-shadow: 2px 2px #000;
  position: relative;
  transition: 1s;
  a {
    z-index: 10;
    display: grid;
    place-items: center;
    line-height: 40px;
    height: 40px;
    width: 100%;
    img { height: 15px; }
    p {
      color: #000;
      font-family: 'Open Sauce Sans Regular';
      display: none;
    }
  }
  @media (min-width: 900px) {
    width: 90%;
    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left: 1em;
      img {
        margin-right: 0.75em;
      }
      p { display: inline-block;}
    }
  }
  @media (min-width: 1200px) { width: 80%; }
`

const NavLink = ({ link, location }) => {
  const { path, page, icon } = link
  const { pathname } = location

  return (
    <Wrap active={pathname === path ? 'active' : 'inactive'}>
      <Link to={path}>
        <img alt={`Icon for ${page}`} src={icon} />
        {!isMobile && <p>{page}</p>}
      </Link>
    </Wrap>
  )
}

export default NavLink
