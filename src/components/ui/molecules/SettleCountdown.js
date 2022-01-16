import React from 'react'

import pluralize from 'pluralize'
import { lighten, darken } from 'polished'
import Countdown, { calcTimeDelta } from 'react-countdown'
import styled from 'styled-components'

import { COLORS } from '../../../theme/ColorPalette'

const { eerieBlack } = COLORS

const Wrap = styled.div`
  border: 2px solid ${lighten(0.75, '#000')};
  border-radius: 10px;
  background-color: ${darken(0.04, '#fff')};
  padding: 0.5em;
  margin-bottom: 0.5em;
  > p {
    color: ${lighten(0.45, eerieBlack)};
    margin-bottom: .5em;
    font-family: 'Open Sauce Sans Regular';
  }
`

const CountdownStyled = styled.div`
  display: flex;
  flex-direction: row;
  p {
    text-align: center;
    margin-right: 1.5em;
    font-size: 0.9em;
    display: flex;
    flex-direction: column;
    color: ${lighten(0.45, eerieBlack)};
    font-family: 'Open Sauce Sans Regular';
    span {
      font-family: antique-olive, sans-serif;
      color: ${lighten(0.25, eerieBlack)};
      font-size: 2em;
    }
  }
`

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  let years
  let remainder
  if (days > 365) {
    years = parseInt(days / 365)
    remainder = days % 365
  }
  if (completed) {
    // Ideally should be header that says Settle Bet
    return null
  } else {
    return (
      <CountdownStyled>
        {years && <p><span>{years}</span> {pluralize('years', years)}</p>}
        <p><span>{days > 365 ? remainder : days}</span> {pluralize('days', days)}</p>
        <p><span>{hours}</span> {pluralize('hours', hours)}</p>
        <p><span>{minutes}</span> {pluralize('minutes', minutes)}</p>
        <p><span>{seconds}</span> {pluralize('seconds', seconds)}</p>
      </CountdownStyled>
    )
  }
}

const SettleCountdown = ({ timestamp }) => {
  const { total } = calcTimeDelta(new Date(timestamp * 1000))
  return (
    <Wrap>
      <p>Time Remaining</p>
      <Countdown
        date={Date.now() + total}
        renderer={renderer}
      />
    </Wrap>
  )
}

export default SettleCountdown
