const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json')
const hre = require('hardhat')
const { ethers } = hre

const { nandor } = require('./nandor.js')

const DAI_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f'
const DAI_WHALE = '0x6F6C07d80D0D433ca389D336e6D1feBEA2489264'

const formatAddr = (addr) => {
  return `${addr.substr(0, 6)}...${addr.substr(-4)}`
}

const main = async () => {
  console.log(nandor)
  console.log('🐳 Whales would say \'Please don\'t pillage me!\' 🐳')

  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [DAI_WHALE]
  })

  const ACCOUNTS = (await ethers.getSigners()).slice(0, 5)
  const WHALE = await ethers.getSigner(DAI_WHALE)
  const CONTRACT = new ethers.Contract(DAI_ADDRESS, ERC20.abi, WHALE)
  const AMOUNT = ethers.utils.parseEther('100000')

  console.log('🐳 And I would say \'noooooooooo\' 🐳')

  try {
    for (const account of ACCOUNTS) {
      const address = account.address
      await CONTRACT.connect(WHALE).transfer(address, AMOUNT)

      console.log(`Siphoning DAI from 🐳 ${formatAddr(WHALE.address)} 🐳 to 🧛 ${formatAddr(address)} 🧛`)
    }
    console.log('🐳 I\'m pillaging everyone! 🐳')
    console.log('🐳 You included. 🐳')
  } catch (e) {
    console.error(e)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
