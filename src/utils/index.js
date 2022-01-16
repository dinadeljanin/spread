import dateFormat from 'dateformat'
import { ethers } from 'ethers'
import Numeral from 'numeral'
import timestamp from 'unix-timestamp'

export const bigNumberify = (amt) => {
  return ethers.utils.parseEther(amt)
}

export const formatAddress = (addr) => {
  return addr && `${addr.substr(0, 6)}...${addr.substr(-4)}`
}

export const formatAreaSeriesData = (arr) => {
  return arr.map(item => ({
    time: dateFormat(item[0]),
    value: item[1]
  }))
}

export const formatToFiat = (amt, decimals) => {
  const smolFloat = smolNumberify(amt, decimals)

  switch (true) {
    case smolFloat < 100000000 && smolFloat >= 1:
      return Numeral(smolFloat).format('$0,0.00')
    case smolFloat < 1:
      return Numeral(smolFloat).format('$0,0.000000')
    default: break
  }
}

export const formatChartPrices = (price) => {
  switch (true) {
    case price < 100000000 && price >= 1:
      return Numeral(price).format('$0,0.00')
    case price < 1:
      return Numeral(price).format('$0,0.00')
    default: break
  }
}

export const getUrl = (token) => {
  return `https://api.coingecko.com/api/v3/coins/${token}/market_chart/range?vs_currency=usd&from=${timestamp.now('-1y')}&to=${timestamp.now()}`
}

export const keyBlock = (event) => {
  const characterCode = event.which ? event.which : event.keyCode

  switch (true) {
    case characterCode === 101:
    case characterCode === 43:
    case characterCode === 45:
      return event.preventDefault()
    default:
      break
  }
}

export const smolNumberify = (amt, decimals = 18) => {
  return parseFloat(ethers.utils.formatUnits(amt, decimals))
}

// EVERYTHING BEFORE THIS LINE WAS REFACTORED
// --------------------------------------------------------------
// EVERYTHING AFTER THIS LINE IS A PIECE OF SHIT
//
// I'm leaving this here as a show of humility ^
