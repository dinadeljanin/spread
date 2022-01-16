const cowsay = require('cowsay')
const hre = require('hardhat')
const { ethers } = hre

const { pricefeeds } = require('./pricefeeds.js')

const main = async () => {
  const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f'

  const Spread = await ethers.getContractFactory('Spread')

  const spread = await Spread.deploy(daiAddress)
  await spread.deployed()
  console.log(cowsay.say({
    text: 'Spread was deployed to: \n' + spread.address
  }))

  await spread.whitelistPriceFeeds(pricefeeds)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(cowsay.say({
      text: error.reason
    }))
    process.exit(1)
  })
