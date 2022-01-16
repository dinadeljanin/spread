import React, { useState, useContext } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { transparentize, darken, cover, lighten } from 'polished'
import Confetti from 'react-confetti'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { EthProvider } from '../../../context'
import { fadeInWithDelay, dropIn } from '../../../theme/FramerVariants.js'
import { wrap } from '../../../theme/Snippets'
import IconButton from '../atoms/IconButton'

const backgroundPalette = {
  warning: '#ffb74b',
  initiated: '#49a6f9',
  pending: '#ffdb59',
  rejected: 'hsl(0, 70%, 67%)',
  success: '#6cd47b'
}

const Overlay = styled(motion.div)`
  ${cover}
  background-color: ${({ status }) => transparentize(0.65, darken(0.5, backgroundPalette[status]))};
  display: grid;
  height: 100%;
  overflow-y: hidden;
  position: absolute;
  place-items: center;
  top: 0;
  width: 100%;
  will-change: transform;
  z-index: 100;
  @media (min-width: 768px) {
    height: 100vh;
  }
`

const Container = styled(motion.div)`
  ${wrap}
  height: fit-content;
  border-radius: 15px;
  box-shadow: 4px 4px rgb(0 0 0);
  position: relative;
  overflow: hidden;
  width: 85%;
  z-index: 200;
  @media (min-width: 768px) {
    width: 400px;
  }
`

const Banner = styled.div`
  background: ${({ status }) => backgroundPalette[status]};
  opacity: 0.8;
  z-index: 1000;
  background-image:
    linear-gradient(
      ${({ status }) => backgroundPalette[status]} 2px,
      transparent 2px
      ),
    linear-gradient(
      to right,
      ${({ status }) => backgroundPalette[status]} 2px,
      ${({ status }) => lighten(0.1, backgroundPalette[status])} 2px
      );
  background-size: 20px 20px;
  border-bottom: 2px solid #000;
  height: fit-content;
  padding: 1.5em 0 0.5em;
  width: 100%;
  height: fit-content;
  text-align: center;
    h2 {
      color: #000;
      font-weight: 500;
  }
  @media (min-width: 500px) {
    h2 {
      width: 80%;
      margin: 0.5em auto 0.25em;
      text-align: center;
      font-size: calc(1em + 0.45vmax);
    }
  }
`

const Modal = ({ body, isMobile = null, showButton = true }) => {
  const { dispatch } = useContext(EthProvider)

  const { header, status, content } = body
  const [modalSeen, setModalSeen] = useState(true)

  const onExit = () => {
    const clearModal = {
      header: '',
      message: '',
      status: '',
      details: {
        address: '',
        amount: 0,
        transactionFee: 0,
        estimatedWait: ''
      }
    }
    setModalSeen(false)
    dispatch({ type: 'CLEAR_MODAL', payload: clearModal })
  }

  console.log(showButton)

  return modalSeen
    ? ReactDOM.createPortal(
        <AnimatePresence>
          <Overlay
            animate="animate"
            exit="exit"
            initial="initial"
            status={status}
            tabIndex='-1'
            variants={fadeInWithDelay}>
            {status === 'success' && (
              <Confetti
                height={window.innerHeight}
                numberOfPieces={300}
                width={window.innerWidth} />
            )}
            <Container
              animate="visible"
              exit="exit"
              initial="hidden"
              variants={dropIn}>
              {(!isMobile && showButton) && <IconButton handleClick={onExit} />}
              <Banner status={status}>
                <h2>{header}</h2>
              </Banner>
              {content}
            </Container>
          </Overlay>
        </AnimatePresence>,
        document.getElementById('portal'))
    : null
}

export default Modal
