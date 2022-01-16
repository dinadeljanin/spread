import React, { useContext } from 'react'

import styled from 'styled-components'

import { EthProvider } from '../../context'
import Balance from '../ui/atoms/Balance'
import AddPriceFeed from '../ui/templates/forms/AddPriceFeed'
import EnableAllowanceForm from '../ui/templates/forms/EnableAllowanceForm'

const Section = styled.section`
  > form:last-of-type {
    margin-top: 1em;
    legend {
      ${'' /* border: 1px solid red; */}
      margin-bottom: 0;
    }
  }
`

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-content: stretch;
  margin-bottom: 1em;
  gap: 20px 20px;
  > * { width: 100%; }
`

const UserAccount = () => {
  const { contracts } = useContext(EthProvider)
  const { spread } = contracts

  console.log(spread)
  return (
    <Section>
      <BalanceContainer>
        <Balance header='Total Balance' type='balance' />
        <Balance header='Spend Limit' type='allowance' />
      </BalanceContainer>
      <EnableAllowanceForm header='Edit Your Spend Limit' />
      <AddPriceFeed />
    </Section>
  )
}

export default UserAccount
