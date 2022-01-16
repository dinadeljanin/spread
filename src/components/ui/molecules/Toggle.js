import React from 'react'

import { AnimateSharedLayout } from 'framer-motion'
import { lighten } from 'polished'
import styled from 'styled-components'

import { eerieBlack } from '../../../theme/ColorPalette'
import Tab from '../atoms/Tab'

const Wrap = styled.div`
  align-items: center;
  background-color: #fff;
  border: 2px solid ${lighten(0.075, eerieBlack)};
  border-radius: 10px;
  box-shadow: transparentize(0.10, '#000') 5px 10px inset;
  display: flex;
  justify-content: space-around;
  margin: 0.1em auto 0em;
  padding: 0.25em;
`

const Toggle = ({ labels, selectedTab, toggleTab }) => {
  const dummyToggle = selectedTab === 0 ? 1 : 0
  return (
    <>
    <label htmlFor="Sentiment Toggle">Sentiment</label>
    <AnimateSharedLayout type='crossfade'>
      <Wrap
        aria-label='Sentiment Toggle'
        onKeyPress={() => toggleTab(dummyToggle)}
        role='tablist'
        tabIndex='0'>
        {labels.map((label, idx) => {
          return (
            <Tab
              idx={idx}
              key={label}
              label={label}
              selectedTab={selectedTab}
              tabIndex='-1'
              toggleTab={() => toggleTab(idx)}
            />
          )
        })}
      </Wrap>
    </AnimateSharedLayout>
    </>
  )
}

export default Toggle
