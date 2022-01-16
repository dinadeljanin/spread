import React, { useState } from 'react'

import { ethers } from 'ethers'
import { motion } from 'framer-motion'
import DatePicker from 'react-datepicker'
import styled, { css } from 'styled-components'

import 'react-datepicker/dist/react-datepicker.css'

import { keyBlock } from '../../../utils'
import MaxButton from '../atoms/MaxButton'

const Label = styled.label`
  input { width: 190px; }
  p {
    bottom: 0.75em;
    font-size: 1.0em;
    left: 0.55em;
    position: absolute;
  }
  ${({ type }) => type === 'price' && css`
    input { padding-left: 1.05em; }
  `}
  ${({ type }) => type === 'address' && css`
    input { width: 100%; box-sizing: border-box; margin-bottom: 1em; }
  `}
`

const Wrap = styled.div`
  display: flex;
  margin: 0.15em 0 1em;
  justify-content: space-between;
  flex-direction: row;
  align-items: stretch;
  > input {
    margin-top: 0;
    box-shadow: 0;
  }
`

export const AmountInput = ({ disabled, reference, handleMax }) => {
  return (
    <label>
      Amount
      <Wrap>
        <motion.input
          defaultValue=''
          disabled={disabled}
          initial={false}
          min='0'
          onKeyPress={keyBlock}
          placeholder='0'
          ref={reference}
          required
          step="0.000001"
          type="number"
          />
        <MaxButton disabled={disabled} handleClick={handleMax} />
      </Wrap>
    </label>
  )
}

export const DateInput = ({ reference }) => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <Label>
      Expiry Date
      <DatePicker
        defaultValue={new Date()}
        minDate={new Date()}
        onChange={date => setStartDate(date)}
        ref={reference}
        required
        selected={startDate}
        showPopperArrow={false}
        strictParsing
      />
    </Label>
  )
}

export const PriceInput = ({ reference }) => {
  return (
    <Label type="price">
      Target Price
      <p>$</p>
      <motion.input
        defaultValue=''
        min='0'
        onKeyPress={keyBlock}
        placeholder='0'
        ref={reference}
        step="0.000001"
        type="number" />
    </Label>
  )
}

export const AddressInput = ({ reference }) => {
  return (
    <Label type='address'>
      Contract Address
      <motion.input
        placeholder={ethers.constants.AddressZero}
        ref={reference}
        required
        type="text" />
    </Label>
  )
}
