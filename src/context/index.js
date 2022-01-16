import React, { createContext, useEffect, useCallback } from 'react'

import ERC20 from '@openzeppelin/contracts/build/contracts/ERC20.json'
import Spread from 'artifacts/contracts/Spread.sol/Spread.json'
import { ethers } from 'ethers'
import { useImmerReducer } from 'use-immer'

import { initialState } from './initialState.js'

import { reducer } from '../reducers'
import { smolNumberify } from '../utils'

export const EthProvider = createContext(initialState)

export const Provider = ({ children }) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)
  const daiContractAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'

  const setAccount = useCallback(async (provider, accounts, networkName, chainId, dai, spread) => {
    if (accounts.length > 0) {
      try {
        const allowance = await dai.allowance(accounts[0], spread.address)
        const balance = await dai.balanceOf(accounts[0])
        const connectedAccount = {
          address: accounts[0],
          allowance: parseInt(smolNumberify(allowance)),
          balance: parseInt(smolNumberify(balance))
        }
        dispatch({ type: 'SET_ACCOUNT', payload: connectedAccount })
      } catch (e) {
        console.log(e)
      }
    } else {
      dispatch({ type: 'SET_ACCOUNT', payload: initialState.user })
    }
  }, [dispatch])

  const connectUser = useCallback(async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      if (provider) {
        const signer = await provider.getSigner()
        const { name, chainId } = await provider.getNetwork()
        const spread = new ethers.Contract(process.env.REACT_APP_LOCAL_HOST_ADDRESS, Spread.abi, signer)
        const dai = new ethers.Contract(daiContractAddress, ERC20.abi, signer)
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setAccount(provider, accounts, name, chainId, dai, spread)
        dispatch({
          type: 'CONNECTED_PROVIDER',
          payload: {
            provider,
            signer,
            name,
            chainId,
            dai,
            spread
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }, [setAccount, dispatch])

  useEffect(() => {
    if (window.ethereum) {
      connectUser()

      window.ethereum.on('accountsChanged', () => {
        connectUser()
        window.location.replace('/')
      })
      window.ethereum.on('chainChanged', () => {
        connectUser()
        window.location.replace('/')
      })
    }
  }, [connectUser, dispatch])

  const { betState, contracts, isLoading, isConnected, name, chainId, provider, user, web3Error, trxFeedback } = state

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(provider, accounts)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <EthProvider.Provider
      value={{
        state,
        betState,
        dispatch,
        contracts,
        isLoading,
        isConnected,
        provider,
        user,
        web3Error,
        name,
        chainId,
        trxFeedback,
        actions: { connect }
      }}>
      {children}
    </EthProvider.Provider>
  )
}
