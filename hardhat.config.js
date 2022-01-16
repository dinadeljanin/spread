require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

const { task } = require('hardhat/config')

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

module.exports = {
  solidity: {
    version: '0.8.7',
    settings: {
      outputSelection: {
        '*': {
          '*': ['storageLayout']
        }
      }
    }
  },
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY_LOCAL}`
      }
    }
  }
}
