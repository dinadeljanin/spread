import React, { useContext } from 'react'

import { ethers } from 'ethers'
import { lighten } from 'polished'
import styled from 'styled-components'

import { EthProvider } from '../../../../context'
import { eerieBlack } from '../../../../theme/ColorPalette'
import { formatAddress } from '../../../../utils'
import { EtherscanButton } from '../../molecules/LinkButtons'
import Modal from '../../organisms/Modal'

const Content = styled.div`
  align-items: center;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: 0.1em auto 0;
  padding: 1em;
  > p { text-align: center; }
`

const TrxSummary = styled.div`
  width: 100%;
  margin: 0 auto;
  > div {
    padding: 0.75em 0.5em 0.75em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid ${lighten(0.55, eerieBlack)};
    p:first-of-type { color: ${lighten(0.25, eerieBlack)}; }
  }
  div:first-of-type { margin-top: 0.5em; }
  div:last-of-type { margin-bottom: 1.5em; }
`

const Transaction = () => {
  const { trxFeedback } = useContext(EthProvider)
  const { header, message, status, details } = trxFeedback

  const body = {
    header,
    status,
    content: (
      <Content>
        {/* UNFUCK THIS MESS */}
        {details && (
          <>
            <TrxSummary>
              <h3>Transaction Summary</h3>
              <div>
                <p>Your address </p>
                <p>{formatAddress(details.address)}</p>
              </div>
              {details.amount && (
                <div>
                  <p>Amount </p>
                  <p>{ethers.utils.commify(details.amount)} DAI</p>
                </div>
              )}
              {details.betSize && (
                <div>
                  <p>Bet Size </p>
                  <p>{ethers.utils.commify(details.betSize)} DAI</p>
                </div>
              )}
              {details.sentiment && (
                <div>
                  <p>Sentiment </p>
                  <p>{details.sentiment}</p>
                </div>
              )}
              {details.spreadPrice && (
                <div>
                  <p>Spread Price </p>
                  <p>${ethers.utils.commify(details.spreadPrice)}</p>
                </div>
              )}
              {details.settleDate && (
                <div>
                  <p>Target Date </p>
                  <p>{details.settleDate}</p>
                </div>
              )}

              {details.priceFeedAddress && (
                <div>
                  <p>Chainlink Pricefeed </p>
                  <p>{formatAddress(details.priceFeedAddress)}</p>
                </div>
              )}
            </TrxSummary>
            {details.trxHash && <EtherscanButton trxHash={details.trxHash} />}
          </>
        )}
        {message && <p>{message}</p>}
      </Content>
    )
  }

  return trxFeedback.header
    ? <Modal body={body} />
    : null
}

export default Transaction
