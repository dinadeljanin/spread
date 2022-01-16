const chai = require('chai');
const hre = require('hardhat');
const timestamp = require('unix-timestamp')
const { solidity } = require('ethereum-waffle')
const { smock } = require('@defi-wonderland/smock');

const { ethers } = hre
const { expect } = chai
chai.use(solidity);
chai.use(smock.matchers);
timestamp.round = true;

describe("Spread", () => {
    let futureSettle
    const answer = ethers.utils.parseEther('4000')
    const betSize = ethers.utils.parseEther('500')
    const sentiment = true
    const heartBeat = 3600
    const spreadPrice = ethers.utils.parseEther('5000')

    beforeEach(async () => {
      [testCreator, testChallenger, thirdParty] = await ethers.getSigners();

      AggregatorV3ContractFactory = await ethers.getContractFactory("MockAggregator");
      DaiContractFactory = await ethers.getContractFactory("ERC20");
      SpreadContractFactory = await ethers.getContractFactory("Spread");

      dai = await DaiContractFactory.deploy("Dai Stablecoin", "DAI");
      chainlink = await AggregatorV3ContractFactory.deploy();

      fakeDai = await smock.fake(dai);
      fakeChainlink = await smock.fake(chainlink);

      spread = await SpreadContractFactory.deploy(fakeDai.address);

      fakeDai.transferFrom.returns();

      spread.whitelistPriceFeeds([fakeChainlink.address])
  });

  describe("Contract Setup", () => {
    it("Should deploy Spread, the morally bankrupt and rentseeking betting contract.", async () => {
      expect(spread.address, "Spread wasn't deployed.").to.exist
    })

    it("Should deploy the imaginary internet DAI ERC20.", async () => {
      expect(fakeDai.address, "Fake DAI wasn't deployed.").to.exist
    })

    it("Should deploy the imposter Chainlink Aggregator V3 Interface.", async () => {
      expect(fakeChainlink.address, "Fake Chainlink wasn't deployed.").to.exist
    })
  });

  describe("createBet", () => {
    it("Should call `createBet`", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      const bet = await spread.fetchBets()

      expect(fakeDai.transferFrom).to.have.been.calledOnce;
      expect(bet.length === 1, "Bet wasn't created")
    });

    it("Should create a bet.", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      const bet = await spread.fetchBets()
      const testBet = bet[0]

      expect(testBet.betCreator, testCreator, "Bet wasn't created by msg.sender.").to.be.equal
      expect(testBet.betChallenger, ethers.constants.AddressZero, "Bet challenger wasn't zero address.").to.be.equal
      expect(testBet.bullish, sentiment, "Bet didn't have correct sentiment.").to.be.equal
      expect(testBet.spreadPrice, spreadPrice, "Bet didn't have spread price.").to.be.equal
      expect(testBet.betSize, heartBeat, betSize, heartBeat, "Bet didn't have correct bet size.").to.be.equal
      expect(testBet.priceFeed, fakeChainlink.address, "Bet didn't price feed for ETH-USD.").to.be.equal
    })

    it("Should not be able to create a bet with a settle date in the past.", async () => {
      pastSettle = timestamp.now('-1d')
      let result = spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, pastSettle);

      await expect(result).to.be.revertedWith("You can't place a bet in the past.")
    })

    it("Should not create bet with a pricefeed that hasn't been whitelisted.", async () => {
      futureSettle = timestamp.now('5d')
      const shiba = '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'
      const result = spread.createBet(shiba, sentiment, betSize, heartBeat, spreadPrice, futureSettle);

      await expect(result).to.be.revertedWith("This pricefeed isn't whitelisted.")
    })
  })

  describe("challengeBet", () => {
    it("Should be challenged by a user.", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)
      const bet = await spread.fetchBets()
      const testBet = bet[0]

      expect(fakeDai.transferFrom).to.have.been.calledTwice;
      expect(testBet.betChallenger, testChallenger, "Bet wasn't challenged by correct user.").to.be.equal
    })

    it("Bet can't be challenged by its creator", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      const challengeBet = spread.connect(testCreator).challengeBet(0)

      await expect(challengeBet).to.be.revertedWith("You can't challenge yourself, silly.")
    })

    it("Can't be challenged by a third party", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)

      const reChallengeBet = spread.connect(thirdParty).challengeBet(0)
      await expect(reChallengeBet).to.be.revertedWith("Bet has already been challenged.")
    })

    it("Can't challenge a bet that doesn't exist", async () => {
      const imaginaryBet = spread.connect(testCreator).challengeBet(1)

      await expect(imaginaryBet).to.be.revertedWith("Bet doesn't exist")
    })
  })

  describe("settleBet", async () => {
    it("Should not be settled before its settlement date.", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)
      const result = spread.connect(testCreator).settleBet(0)

      await expect(result).to.be.revertedWith("Bet isn't ready to be settled.")
    })

    it("Should be settled after its settlement date.", async () => {
      futureSettle = timestamp.now('5d')
      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)

      await ethers.provider.send("evm_increaseTime", [86400 * 6])

      const latestBlock = await ethers.provider.getBlock("latest")

      const timeStamp = latestBlock.timestamp + 86400 * 6 - 30
      fakeChainlink.latestRoundData.returns([0, answer, timeStamp, timeStamp, 0])

      await spread.connect(testCreator).settleBet(0)
      const bet = await spread.fetchBets()
      const testBet = bet[0]

      await expect(testBet.isSettled, "Bet couldn't be settled.").to.be.true
    })

    it("Should not be settled after it's already been settled.", async () => {
      const latestBlock = await ethers.provider.getBlock("latest")

      futureSettle = timestamp.add(latestBlock.timestamp, '5d')

      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)

      await ethers.provider.send("evm_increaseTime", [86400 * 11 + 45])

      const timeStamp = latestBlock.timestamp + 86400 * 11 - 30
      fakeChainlink.latestRoundData.returns([1, answer, timeStamp, timeStamp, 1])

      await spread.connect(testCreator).settleBet(0)
      const bet = await spread.fetchBets()
      const testBet = bet[0]

      const result = spread.connect(testChallenger).settleBet(0)
      await expect(result).to.be.revertedWith("Bet has already been settled.")
    })

    it("Should not be able to settle if the price feed is lagging.", async () => {
      const latestBlock = await ethers.provider.getBlock("latest")

      futureSettle = timestamp.add(latestBlock.timestamp, '5d')

      await spread.createBet(fakeChainlink.address, sentiment, betSize, heartBeat, spreadPrice, futureSettle);
      await spread.connect(testChallenger).challengeBet(0)

      await ethers.provider.send("evm_increaseTime", [86400 * 16 + 45])

      const timeStamp = latestBlock.timestamp + 86400 * 16 - 3645
      fakeChainlink.latestRoundData.returns([2, answer, timeStamp, timeStamp, 2])

      const result = spread.connect(testCreator).settleBet(0)

      await expect(result).to.be.revertedWith("The price feed is lagging. Can't settle this bet yet.")
    })
  })

  describe('whitelistPriceFeeds', async () => {
    it("Should not be called by anyone other than the owner.", async () => {
      const result = spread.connect(thirdParty).whitelistPriceFeeds(['0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'])

      await expect(result).to.be.revertedWith("Ownable: caller is not the owner")
    })
  })
})
