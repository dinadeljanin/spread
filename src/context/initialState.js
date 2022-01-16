export const initialState = {
  contracts: {
    dai: null,
    spread: null
  },
  isLoading: true,
  isConnected: false,
  name: null,
  chainId: null,
  provider: null,
  signer: null,
  user: {
    accounts: [],
    address: '',
    ens: null,
    avatar: null,
    allowance: 0,
    balance: 0
  },
  trxFeedback: {
    header: '',
    message: '',
    status: '',
    details: {
      address: '',
      amount: 0,
      transactionFee: 0,
      estimatedWait: '',
      trxHash: '',
      sentiment: '',
      betsize: 0,
      spreadPrice: 0,
      settleDate: ''
    }
  },
  betState: {
    bets: []
  }
}
