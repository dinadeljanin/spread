import React, { useContext, useState, useEffect, useRef } from 'react'

import { SpendLimit } from '../../../../constants/ToolTips.js'
import { ENABLING_FEEDBACK } from '../../../../constants/TransactionFeedback'
import { EthProvider } from '../../../../context'
import { smolNumberify, bigNumberify } from '../../../../utils'
import FormButton from '../../atoms/FormButton'
import Form from '../../molecules/Form'
import { AmountInput } from '../../molecules/Input'

const EnableAllowanceForm = ({ header = null }) => {
  const [disabled, setDisabled] = useState(true)
  const { user, provider, contracts, dispatch, chainId } = useContext(EthProvider)
  const { balance, address } = user
  const { dai, spread } = contracts

  const allowanceRef = useRef()

  const { initiated, pending, success, rejection, nonceError } = ENABLING_FEEDBACK

  useEffect(() => {
    switch (true) {
      case address !== '' && provider:
      case chainId === 31337:
        return setDisabled(false)
      default:
        break
    }
  }, [address, provider])

  const setMaxAllowance = async (e) => {
    e.preventDefault()
    allowanceRef.current.value = balance
  }

  const approveAllowance = async (e) => {
    e.preventDefault()
    if (!disabled) {
      const amount = allowanceRef.current.value
      const initiatedInfo = {
        ...initiated,
        details: { address, amount }
      }
      dispatch({ type: 'ENABLE_STABLECOIN', payload: initiatedInfo })
      try {
        const approveDai = await dai.approve(spread.address, bigNumberify(amount))
        dispatch({ type: 'ENABLE_STABLECOIN', payload: { ...pending, details: { address: amount } } })
        await approveDai.wait()
        const allowance = await dai.allowance(user.address, spread.address)
        dispatch({ type: 'SET_ALLOWANCE', payload: smolNumberify(allowance) })
        const successInfo = {
          ...success,
          details: {
            address,
            amount: smolNumberify(allowance),
            trxHash: approveDai.hash
          }
        }
        dispatch({ type: 'ENABLE_STABLECOIN', payload: successInfo })
      } catch (e) {
        console.log(e)
        if (e.code === 4001) {
          dispatch({ type: 'ENABLE_STABLECOIN', payload: rejection })
        } else if (e.code === -32603) {
          dispatch({ type: 'ENABLE_STABLECOIN', payload: nonceError })
        }
      }
    }
  }

  return (
    <Form
      disabled={disabled}
      handleSubmit={approveAllowance}
      header={header || 'Enable A Spend Limit'}
      toolTip={<SpendLimit />}>
        <AmountInput
          disabled={disabled}
          handleMax={setMaxAllowance}
          reference={allowanceRef}
        />
        <FormButton action='Approve'/>
    </Form>
  )
}

export default EnableAllowanceForm
