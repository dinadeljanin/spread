import React, { useContext, useState, useEffect, useRef } from 'react'

import { ethers } from 'ethers'

import { WHITELIST_PRICE_FEED } from '../../../../constants/TransactionFeedback'
import { EthProvider } from '../../../../context'
import FormButton from '../../atoms/FormButton'
import Form from '../../molecules/Form'
import { AddressInput } from '../../molecules/Input'

const AddPriceFeed = () => {
  const [isOwner, setOwner] = useState('')
  const { user, contracts, dispatch } = useContext(EthProvider)
  const { address } = user
  const { spread } = contracts

  const addressRef = useRef()

  const { initiated, pending, success, invalid } = WHITELIST_PRICE_FEED

  useEffect(() => {
    (async () => {
      const getOwner = await spread.owner()
      setOwner(getOwner)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (ethers.utils.getAddress(addressRef.current.value) && isOwner.toLowerCase() === address) {
        const details = { address, priceFeedAddress: addressRef.current.value, trxHash: '' }
        dispatch({ type: 'WHITELIST_PRICE_FEED', payload: { ...initiated, details } })
        const whitelistPriceFeed = await spread.whitelistPriceFeeds([addressRef.current.value])
        dispatch({ type: 'WHITELIST_PRICE_FEED', payload: { ...pending, details } })
        await whitelistPriceFeed.wait()
        const successInfo = {
          ...success,
          details: {
            address,
            priceFeedAddress: addressRef.current.value,
            trxHash: whitelistPriceFeed.hash
          }
        }
        dispatch({ type: 'WHITELIST_PRICE_FEED', payload: successInfo })
      }
    } catch (e) {
      console.log(e)
      dispatch({ type: 'WHITELIST_PRICE_FEED', payload: invalid })
    }
  }

  // Remember where this got you before
  return isOwner.toLowerCase() === address
    ? <Form
        handleSubmit={handleSubmit}
        header={'Add a Price Feed'}
        showBalance={false}>
        <AddressInput reference={addressRef} />
        <FormButton action='Whitelist' />
      </Form>
    : null
}

export default AddPriceFeed
