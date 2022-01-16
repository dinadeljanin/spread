import React from 'react'

import { motion } from 'framer-motion'
import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import { COLORS } from '../../../theme/ColorPalette'
import { tap } from '../../../theme/FramerVariants'

const { eerieBlack } = COLORS

const MaxButtonStyled = styled(motion.button)`
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid ${lighten(0.075, eerieBlack)};
  color: ${eerieBlack};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 5px;
  cursor: pointer;
  width: 55px;
  display: grid;
  place-items: center;
  transition: 0.2s;
  ${({ disabled }) => !disabled && css`
    &:hover {
      background-color: #c8b9ff;
    }
  `}
`

const MaxButton = ({ disabled, handleClick }) => {
  return (
    <MaxButtonStyled
      disabled={disabled}
      onClick={handleClick}
      type="button"
      whileTap={tap}>
      max
    </MaxButtonStyled>
  )
}

export default MaxButton
