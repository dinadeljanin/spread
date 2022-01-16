const _ = require('lodash')
const Numeral = require('numeral')
const timestamp = require('unix-timestamp')

timestamp.round = true

const { tokens } = require('./pricefeeds.js')

const sentiments = ['Bullish', 'Bearish']
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const today = timestamp.now()
const future = timestamp.now('3y')

const token = tokens[_.random(0, tokens.length - 1)]
const sentiment = sentiments[_.random(0, sentiments.length - 1)]
const date = new Date(_.random(today, future) * 1000)

console.log('Random Bet')
console.log(`Token: ${token}`)
console.log(`Sentiment: ${sentiment}`)
console.log(`Target Date: ${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`)
console.log('Target Prices:')
// console.log(`#1: ${Numeral(_.random(0, 100000, true)).format('$0,0.00')}`)
console.log(`#2: ${Numeral(_.random(0, 10000, true)).format('$0,0.00')}`)
// console.log(`#3: ${Numeral(_.random(0, 1000, true)).format('$0,0.00')}`)
console.log(`#4: ${Numeral(_.random(0, 100, true)).format('$00.00')}`)
// console.log(`#5: ${Numeral(_.random(1, 10, true)).format('$0.00')}`)
console.log(`#6: ${Numeral(_.random(0, 1, true)).format('$0.00000')}`)
