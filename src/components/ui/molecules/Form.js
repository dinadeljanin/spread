import React from 'react'

import Balance from '../atoms/Balance'
import ToolTip from '../atoms/ToolTip'

const Form = ({ children, header = null, toolTip, disabled, handleSubmit, showBalance = true }) => {
  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={disabled}>
        {header && (
          <legend>
            <h2>{header}</h2>
            {toolTip && <ToolTip info={toolTip} />}
          </legend>
        )}
        {showBalance && <Balance />}
        {children}
      </fieldset>
    </form>
  )
}

export default Form
