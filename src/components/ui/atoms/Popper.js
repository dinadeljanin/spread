import React from 'react'

import styled from 'styled-components'

const Wrap = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  display: none;
  box-sizing: border-box;
  color: #000;
  border-radius: 8px;
  border: 2px solid #000;
  background-color: #fff;
  box-shadow: 3px 3px rgb(0 0 0);
  text-align: left;
  z-index: 1000;
  top: 12px;
  left: 12px;
  pointer-events: none;
  div {
    padding: 0.75em;
    border-radius: 8px;
  }
  #price {
    font-size: 1.2em;
  }
`

const Popper = ({ reference }) => {
  return <Wrap ref={reference} />
}

export default Popper
