import React, { forwardRef } from 'react'

import Tippy from '@tippyjs/react'
import { transparentize } from 'polished'
import styled from 'styled-components'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'

import info from '../../../assets/icons/info.svg'
import { COLORS } from '../../../theme/ColorPalette'

const { eerieBlack } = COLORS

const InfoStyled = styled.div`
  background: no-repeat center / 120% url(${info});
  border: 2px solid ${eerieBlack};
  border-radius: 50%;
  height: 0.9em;
  width: 0.9em;
  cursor: pointer;
  margin: 0 15px;
  @media (min-width: 500px) {
    height: 1.1em;
    width: 1.1em;
  }
`

const TippyStyled = styled(Tippy)`
  background-color: #c8b9ff;
  border: 2px solid ${eerieBlack};
  border-radius: 8px;
  box-shadow: ${transparentize(0.75, '#000')} 0 5px 15px;
  padding: 0.25em;
  p a {
    text-decoration: underline;
  }
`

const ToolTip = ({ info }) => {
  const Info = forwardRef((props, ref) => {
    return <InfoStyled ref={ref} />
  })

  Info.displayName = 'Tooltip'

  return (
    <TippyStyled
      animation="scale"
      arrow={false}
      content={info}
      interactive="true">
      <Info />
    </TippyStyled>
  )
}

export default ToolTip
