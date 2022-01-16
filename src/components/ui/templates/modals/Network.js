import React, { useContext } from 'react'

import styled from 'styled-components'

import { NETWORKS } from '../../../../constants/Networks'
import { EthProvider } from '../../../../context'
import Modal from '../../organisms/Modal'

const Content = styled.div`
  background-color: #fff;
  align-items: center;
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
      margin: 1em auto;
    }
  }
`

const Onboarding = () => {
  const { provider, chainId } = useContext(EthProvider)
  const renderBody = () => {
    const connectedNetwork = NETWORKS.find(network => network.chainId === chainId)
    return {
      header: `You're currently connected to ${connectedNetwork.name}`,
      status: 'warning',
      content: (
        <Content>
          <p>{connectedNetwork.message}</p>
        </Content>
      )
    }
  }

  return provider && chainId !== 31337
    ? <Modal body={renderBody()} showButton={false} />
    : null
}

export default Onboarding
