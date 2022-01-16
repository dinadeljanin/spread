import React, { useContext } from 'react'

import { motion } from 'framer-motion'
import styled from 'styled-components'

import { EthProvider } from '../../../context'
import { eerieBlack } from '../../../theme/ColorPalette'
import { tap, hover } from '../../../theme/FramerVariants.js'

const Connect = styled(motion.button)`
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 30px;
  padding: .1em;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  height: fit-content;
  height: 40px;
  > p {
    color: ${eerieBlack};
    padding: .45em .75em;
    margin: 0;
  }
`

const ConnectButton = () => {
  const { actions } = useContext(EthProvider)
  const { connect } = actions

  return (
    <Connect
      onClick={() => connect()}
      whileHover={hover}
      whileTap={tap}>
      <p>Connect Wallet</p>
    </Connect>
  )
}

export default ConnectButton
