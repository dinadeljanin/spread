// I'm so smart look at me
import inch from '../assets/images/tokens/1inch.png'
import aave from '../assets/images/tokens/aave.png'
import avalanche from '../assets/images/tokens/avalanche.png'
import band from '../assets/images/tokens/band.svg'
import bat from '../assets/images/tokens/bat.png'
import bitcoin from '../assets/images/tokens/bitcoin.png'
import bnb from '../assets/images/tokens/bnb.png'
import cardano from '../assets/images/tokens/cardano.png'
import chainlink from '../assets/images/tokens/chainlink.png'
import compound from '../assets/images/tokens/compound.png'
import curve from '../assets/images/tokens/curve.png'
import doge from '../assets/images/tokens/doge.png'
import ethereum from '../assets/images/tokens/ethereum.png'
import fxs from '../assets/images/tokens/fxs.png'
import matic from '../assets/images/tokens/matic.png'
import monero from '../assets/images/tokens/monero.png'
import numeraire from '../assets/images/tokens/numeraire.png'
import orchid from '../assets/images/tokens/orchid.png'
import polkadot from '../assets/images/tokens/polkadot.png'
import sushi from '../assets/images/tokens/sushi.png'
import synthetix from '../assets/images/tokens/synthetix.png'
import uniswap from '../assets/images/tokens/uniswap.png'
import yearn from '../assets/images/tokens/yearn.png'
import zec from '../assets/images/tokens/zec.png'

export const TOKEN_PAIRS = {
  'eth-usd': {
    api_id: 'ethereum',
    name: 'Ethereum',
    pair: 'eth-usd',
    palette: '#627eeb',
    image: ethereum,
    pricefeed_ens: 'eth-usd.data.eth',
    priceFeed_address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
    heartbeat: 3600
  },
  'btc-usd': {
    api_id: 'bitcoin',
    name: 'Bitcoin',
    pair: 'btc-usd',
    palette: '#f7931a',
    image: bitcoin,
    pricefeed_ens: 'btc-usd.data.eth',
    priceFeed_address: '0xf4030086522a5beea4988f8ca5b36dbc97bee88c',
    heartbeat: 3600
  },
  'aave-usd': {
    api_id: 'aave',
    name: 'Aave',
    pair: 'aave-usd',
    palette: '#B6509E',
    image: aave,
    pricefeed_ens: 'aave-usd.data.eth',
    priceFeed_address: '0x547a514d5e3769680ce22b2361c10ea13619e8a9',
    heartbeat: 3600
  },
  'ada-usd': {
    api_id: 'cardano',
    name: 'Cardano',
    pair: 'ada-usd',
    palette: '#2a71d0',
    image: cardano,
    pricefeed_ens: 'ada-usd.data.eth',
    priceFeed_address: '0xae48c91df1fe419994ffda27da09d5ac69c30f55',
    heartbeat: 86400
  },
  'link-usd': {
    api_id: 'chainlink',
    name: 'Chainlink',
    pair: 'link-usd',
    palette: '#375BD2',
    image: chainlink,
    pricefeed_ens: 'link-usd.data.eth',
    priceFeed_address: '0x2c1d072e956affc0d435cb7ac38ef18d24d9127c',
    heartbeat: 3600
  },
  'doge-usd': {
    api_id: 'dogecoin',
    name: 'Dogecoin',
    pair: 'doge-usd',
    palette: '#e1b303',
    image: doge,
    pricefeed_ens: 'doge-usd.data.eth',
    priceFeed_address: '0x2465cefd3b488be410b941b1d4b2767088e2a028',
    heartbeat: 86400
  },
  'yfi-usd': {
    api_id: 'yearn-finance',
    name: 'Yearn',
    pair: 'yfi-usd',
    palette: '#006be3',
    image: yearn,
    pricefeed_ens: 'yfi-usd.data.eth',
    priceFeed_address: '0xa027702dbb89fbd58938e4324ac03b58d812b0e1',
    heartbeat: 3600
  },
  'uni-usd': {
    api_id: 'uniswap',
    name: 'Uniswap',
    pair: 'uni-usd',
    palette: '#FF007A',
    image: uniswap,
    pricefeed_ens: 'uni-usd.data.eth',
    priceFeed_address: '0x553303d460ee0afb37edff9be42922d8ff63220e',
    heartbeat: 3600
  },
  'comp-usd': {
    api_id: 'compound-governance-token',
    name: 'Compound',
    pair: 'comp-usd',
    palette: '#00d394',
    image: compound,
    pricefeed_ens: 'comp-usd.data.eth',
    priceFeed_address: '0xdbd020caef83efd542f4de03e3cf0c28a4428bd5',
    heartbeat: 3600
  },
  'snx-usd': {
    api_id: 'havven',
    name: 'Synthetix',
    pair: 'snx-usd',
    palette: '#0cd1ff',
    image: synthetix,
    pricefeed_ens: 'snx-usd.data.eth',
    priceFeed_address: '0xdc3ea94cd0ac27d9a86c180091e7f78c683d3699',
    heartbeat: 86400
  },
  'sushi-usd': {
    api_id: 'sushi',
    name: 'Sushi',
    pair: 'sushi-usd',
    palette: '#db5fa8',
    image: sushi,
    pricefeed_ens: 'sushi-usd.data.eth',
    priceFeed_address: '0xcc70f09a6cc17553b2e31954cd36e4a2d89501f7',
    heartbeat: 3600
  },
  'crv-usd': {
    api_id: 'curve-dao-token',
    name: 'Curve DAO Token',
    pair: 'crv-usd',
    palette: '#33609d',
    image: curve,
    pricefeed_ens: 'crv-usd.data.eth',
    priceFeed_address: '0xcd627aa160a6fa45eb793d19ef54f5062f20f33f',
    heartbeat: 86400
  },
  'bnb-usd': {
    api_id: 'binancecoin',
    name: 'Binance Coin',
    pair: 'bnb-usd',
    palette: '#f3ba2d',
    image: bnb,
    pricefeed_ens: 'bnb-usd.data.eth',
    priceFeed_address: '0x14e613ac84a31f709eadbdf89c6cc390fdc9540a',
    heartbeat: 86400
  },
  'avax-usd': {
    api_id: 'avalanche-2',
    name: 'Avalanche',
    pair: 'avax-usd',
    palette: '#e74241',
    image: avalanche,
    pricefeed_ens: 'avax-usd.data.eth',
    priceFeed_address: '0xff3eeb22b5e3de6e705b44749c2559d704923fd7',
    heartbeat: 86400
  },
  'band-usd': {
    api_id: 'band-protocol',
    name: 'Band Protocol',
    pair: 'band-usd',
    palette: '#441fdc',
    image: band,
    pricefeed_ens: 'band-usd.data.eth',
    priceFeed_address: '0x919c77acc7373d000b329c1276c76586ed2dd19f',
    heartbeat: 86400
  },
  'nmr-usd': {
    api_id: 'numeraire',
    name: 'Numeraire',
    pair: 'nmr-usd',
    palette: '#222222',
    image: numeraire,
    pricefeed_ens: 'nmr-usd.data.eth',
    priceFeed_address: '0xcc445b35b3636bc7cc7051f4769d8982ed0d449a',
    heartbeat: 86400
  },
  'oxt-usd': {
    api_id: 'orchid-protocol',
    name: 'Orchid Protocol',
    pair: 'oxt-usd',
    palette: '#5f44b9',
    image: orchid,
    pricefeed_ens: 'oxt-usd.data.eth',
    priceFeed_address: '0xd75aaae4af0c398ca13e2667be57af2cca8b5de6',
    heartbeat: 86400
  },
  'bat-usd': {
    api_id: 'basic-attention-token',
    name: 'Basic Attention Token',
    pair: 'bat-usd',
    palette: '#9538db',
    image: bat,
    pricefeed_ens: 'bat-usd.data.eth',
    priceFeed_address: '0x9441d7556e7820b5ca42082cfa99487d56aca958',
    heartbeat: 3600
  },
  'zec-usd': {
    api_id: 'zcash',
    name: 'Zcash',
    pair: 'zec-usd',
    palette: '#f5b626',
    image: zec,
    pricefeed_ens: 'zec-usd.data.eth',
    priceFeed_address: '0xd54b033d48d0475f19c5fccf7484e8a981848501',
    heartbeat: 86400
  },
  'dot-usd': {
    api_id: 'polkadot',
    name: 'Polkadot',
    pair: 'dot-usd',
    palette: '#e6027a',
    image: polkadot,
    pricefeed_ens: 'dot-usd.data.eth',
    priceFeed_address: '0x1c07afb8e2b827c5a4739c6d59ae3a5035f28734',
    heartbeat: 86400
  },
  'xmr-usd': {
    api_id: 'monero',
    name: 'Monero',
    pair: 'xmr-usd',
    palette: '#f36823',
    image: monero,
    pricefeed_ens: 'xmr-usd.data.eth',
    priceFeed_address: '0xfa66458cce7dd15d8650015c4fce4d278271618f',
    heartbeat: 86400
  },
  'matic-usd': {
    api_id: 'matic-network',
    name: 'Polygon (Matic)',
    pair: 'matic-usd',
    palette: '#8148e5',
    image: matic,
    pricefeed_ens: 'matic-usd.data.eth',
    priceFeed_address: '0x7bac85a8a13a4bcd8abb3eb7d6b4d632c5a57676',
    heartbeat: 3600
  },
  '1inch-usd': {
    api_id: '1inch',
    name: '1inch',
    pair: '1inch-usd',
    palette: '#ff364f',
    image: inch,
    pricefeed_ens: '1inch-usd.data.eth',
    priceFeed_address: '0xc929ad75b72593967de83e7f7cda0493458261d9',
    heartbeat: 86400
  },
  'fxs-usd': {
    api_id: 'frax-share',
    name: 'Frax Share',
    pair: 'fxs-usd',
    palette: '#191919',
    image: fxs,
    pricefeed_ens: 'fxs-usd.data.eth',
    priceFeed_address: '0x6ebc52c8c1089be9eb3945c4350b68b8e4c2233f',
    heartbeat: 86400
  }
}
