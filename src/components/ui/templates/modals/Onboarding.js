import React from 'react'

import { isMobile, isIOS } from 'react-device-detect'
import styled from 'styled-components'

import { MetaMaskButton as Button, AppStoreBadge, GooglePlayBadge } from '../../molecules/LinkButtons'
import Modal from '../../organisms/Modal'

const Content = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0.1em auto 0;
  padding: 1.1em 1em 0.5em;
  p {
    text-align: center;
    margin: 0 auto 0.5em;
  }
  @media (min-width: 800px) {
    padding: 1em;
    p {
      margin: 0 auto 1em;
    }
  }
`

const Onboarding = () => {
  const browserBody = {
    header: 'Hmm, do you have a browser wallet?',
    status: 'warning',
    content: (
      <Content>
        <p>
          You might not have MetaMask installed, or you might be using an unsupported browser. While you can view this dApp in a read-only state, you won&apos;t be able to interact with it.
        </p>
        <Button />
      </Content>
    )
  }

  const mobileBody = {
    header: 'Hmm, are you using MetaMask Mobile?',
    status: 'warning',
    content: (
      <Content>
        <p>
          MetaMask Mobile has a built-in web browser that will let you access this dApp.
        </p>
        {isIOS ? <AppStoreBadge /> : <GooglePlayBadge />}
      </Content>
    )
  }

  return !window.ethereum
    ? <Modal
      body={isMobile ? mobileBody : browserBody}
      isMobile={isMobile} />
    : null
}

export default Onboarding
