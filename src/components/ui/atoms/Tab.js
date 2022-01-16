import React from 'react'

import { motion } from 'framer-motion'
import { cover } from 'polished'
import styled from 'styled-components'

const TabStyled = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: relative;
  div {
    ${cover()}
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    background-color: ${({ label }) => labelTypes[label]};
    border: 2px solid #000;
  }
  span {
    color: #000;
    font-family: 'Open Sauce Sans Regular';
    font-size: 1.2em;
    font-weight: 600;
    padding: 0.5em 0.75em 0.5em;
    transition: ease 200ms color;
    z-index: 1;
  }
`

const labelTypes = { Bullish: '#2aeba4', Bearish: '#fe5a58' }

const Tab = ({ label, idx, selectedTab, toggleTab, tabIndex }) => {
  return (
    <TabStyled
      aria-label={`${label} Tab`}
      aria-selected={selectedTab === idx}
      key={label}
      label={label}
      onClick={toggleTab}
      role='tab'
      tabIndex={tabIndex}>
      <span>{label}</span>
      {selectedTab === idx && (
        <motion.div
          layoutId='tab'
          transition={{
            type: 'spring',
            stiffness: 600,
            damping: 50
          }}
        />
      )}
    </TabStyled>
  )
}

export default Tab
