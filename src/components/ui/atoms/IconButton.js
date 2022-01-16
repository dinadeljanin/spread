import React from 'react'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import xClose from '../../../assets/icons/x-close.svg'

const icons = { exit: xClose }

const Button = styled(motion.button)`
  background: url(${icons.exit}) center;
  background-repeat: no-repeat;
  background-size: 70%;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  height: 25px;
  position: absolute;
  right: 7px;
  top: 7px;
  width: 25px;
  z-index: 10;
`

const IconButton = ({ handleClick }) => {
  return <Button onClick={handleClick} tabIndex='0' />
}

export default IconButton
