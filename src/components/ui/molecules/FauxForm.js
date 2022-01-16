import React from 'react'

import Balance from '../atoms/Balance'
import FormButton from '../atoms/FormButton'

const FauxForm = ({ action, disabled, children, handleSubmit, showBalance = true, showButton = true }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={disabled}>
        {showBalance && <Balance />}
        {children}
        {showButton && <FormButton action={action} />}
      </fieldset>
    </form>
  )
}

export default FauxForm
