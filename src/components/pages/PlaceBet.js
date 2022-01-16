import React, { useContext, useRef } from 'react'

import { lighten } from 'polished'
import styled from 'styled-components'

import { EthProvider } from '../../context'
import { COLORS } from '../../theme/ColorPalette'
import Chart from '../Chart'
import EnableAllowanceForm from '../ui/templates/forms/EnableAllowanceForm'
import PlaceBetForm from '../ui/templates/forms/PlaceBetForm'

const { eerieBlack } = COLORS

const Section = styled.section`
  display: grid;
  align-self: start;
  width: 90%;
  max-width: 90%;
  margin: 0 auto 1em;
  height: fit-content;
  grid-gap: 1em 1.5em;
  grid-template:
  'header' auto
  'form' auto
  'chart' auto;
  header {
    margin: 0;
    padding: 0;
    background-color: transparent;
    height: fit-content;
    border-bottom: none;
    width: fit-content;
    grid-area: header;
    > h1 {
      padding-bottom: 0em;
      text-transform: capitalize;
      margin-left: .5em;
      span {
        margin-left: 5px;
        text-transform: uppercase;
        color: ${lighten(0.35, eerieBlack)};
      }
    }
    > img {
      padding: 2px;
      border: 2px solid #000;
      border-radius: 50%;
      height: 35px;
      width: 35px;
    }
  }
  @media (min-width: 1200px) {
    margin: 0 auto;
    grid-template:
      'header header'
      'chart form';
    grid-template-columns: calc(100% - 460px - 1.5em) auto;
    grid-template-rows: auto auto;
  }
`

const PlaceBet = ({ pairData }) => {
  const { user } = useContext(EthProvider)
  const { allowance } = user
  const sectionRef = useRef()

  const { name, pair, api_id, image, palette } = pairData
  return (
    <Section>
      <header>
        <img alt={`Logo for ${name}`} src={image} />
        <h1>{name} <span>{pair}</span></h1>
      </header>
      <Chart apiId={api_id} color={palette} reference={sectionRef} />
      {allowance > 0
        ? <PlaceBetForm pairData={pairData} />
        : <EnableAllowanceForm />
      }
    </Section>
  )
}

export default PlaceBet
