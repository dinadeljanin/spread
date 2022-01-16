import React from 'react'

import { motion } from 'framer-motion'
import { lighten } from 'polished'
import styled from 'styled-components'

import { COLORS } from '../../../theme/ColorPalette.js'
import { tap, hover } from '../../../theme/FramerVariants.js'

const { eerieBlack } = COLORS

const Button = styled(motion.input)`
  border: none;
  outline: none;
  border-radius: 10px;
  box-shadow: none;
  color: ${eerieBlack};
  font-weight: bold;
  background-color: ${lighten(0.09, '#49a6f9')};
  border: 2px solid #000;
  cursor: pointer;
  height: 45px;
  font-size: 1.2em;
  font-weight: 400;
  width: 100%;
  padding: 0;
`

const FormButton = ({ action, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type='submit'
      value={action}
      whileHover={disabled && hover}
      whileTap={disabled && tap}
    />
  )
}

export default FormButton
