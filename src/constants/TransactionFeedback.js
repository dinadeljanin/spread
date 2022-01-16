export const ENABLING_FEEDBACK = {
  initiated: {
    header: 'Setting Spend Limit',
    message: 'Please confirm the transaction in MetaMask.',
    status: 'initiated'
  },
  pending: {
    header: 'Approving Spend Limit',
    message: 'Wait for your transaction to confirm.',
    status: 'pending'
  },
  success: {
    header: 'Spend Limit Approved',
    message: '',
    status: 'success'
  },
  rejection: {
    header: 'Signature Request Rejected',
    message: 'You rejected the request to approve your DAI.',
    status: 'warning'
  },
  nonceError: {
    header: 'The nonce for this transaction was too high.',
    message: 'This transaction will usually fail if you didn\'t reset your account on MetaMask before interacting with this dApp.',
    status: 'rejected'
  }
}

export const PLACE_BET_FEEDBACK = {
  initiated: {
    header: 'Placing your bet',
    message: 'Please confirm the transaction in MetaMask.',
    status: 'initiated'
  },
  pending: {
    header: 'Confirming your bet',
    message: 'Wait for your transaction to confirm.',
    status: 'pending'
  },
  success: {
    header: 'Your bet was placed',
    message: '',
    status: 'success'
  },
  rejection: {
    header: 'Couldn\'t place your bet',
    message: 'You rejected the request to place your bet.',
    status: 'warning'
  },
  reverted: {
    header: 'Couldn\'t place your bet.',
    message: 'You don\'t have enough DAI to place this bet.',
    status: 'rejected'
  }
}

export const CHALLENGE_BET_FEEDBACK = {
  initiated: {
    header: 'Challenging Bet',
    message: 'Please confirm the transaction in MetaMask.',
    status: 'pending'
  },
  success: {
    header: 'Bet Challenged',
    message: '',
    status: 'success'
  }
}

export const WHITELIST_PRICE_FEED = {
  initiated: {
    header: 'Whitelisting a New price feed',
    message: 'Please confirm the transaction in MetaMask',
    status: 'initiated'
  },
  pending: {
    header: 'Whitelist Pending',
    message: '',
    status: 'pending'
  },
  success: {
    header: 'The price feed was whitelisted.',
    message: '',
    status: 'success'
  },
  invalid: {
    header: 'Couldn\'t whitelist this price feed.',
    message: 'The address provided was not valid.',
    status: 'rejected'
  }
}

export const SETTLE_BET_FEEDBACK = {
  initiated: {
    header: 'Settling Bet',
    message: 'Please confirm the transaction in MetaMask',
    status: 'initiated'
  },
  pending: {
    header: 'Settle Bet Pending',
    message: '',
    status: 'pending'
  },
  success: {
    header: 'Bet was settled',
    message: '',
    status: 'success'
  },
  failure: {
    header: 'Couldn\'t settle this bet',
    message: '',
    status: 'rejected'
  }
}
