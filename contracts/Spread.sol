//SPDX-License-Identifier: Passive-Aggressive License
pragma solidity 0.8.7;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "hardhat/console.sol";

contract Spread is Ownable {
    uint public betCount;
    IERC20 public daiIERC20;

    mapping (address => Bet[]) public userBets;
    mapping (address => bool) public priceFeeds;

    Bet[] public bets;

    struct Bet {
        address betCreator;
        address betChallenger;
        AggregatorV3Interface priceFeed;
        bool bullish;
        bool isSettled;
        uint betSize;
        uint heartBeat;
        int spreadPrice;
        int settledPrice;
        uint settlementDate;
    }

    constructor (address _daiERC20) {
        daiIERC20 = IERC20(_daiERC20);
    }

    event LogBetCreated(uint _betIndex);
    event LogBetChallenged(uint _betIndex);
    event LogBetSettled(uint _betIndex);

    modifier betExists(uint _betIndex) {
        require(_betIndex < bets.length, "Bet doesn't exist");
        _;
    }

    modifier isBetOpen(uint _betIndex) {
        require(!bets[_betIndex].isSettled, "Bet has already been settled.");
        _;
    }

    modifier isBetValid(uint _betIndex) {
        require(bets[_betIndex].betCreator != address(0), "Bet isn't valid.");
        require(bets[_betIndex].betCreator != msg.sender, "You can't challenge yourself, silly.");
        _;
    }

    modifier isBetUnchallenged(uint _betIndex) {
        require(bets[_betIndex].betChallenger == address(0), "Bet has already been challenged.");
        _;
    }

    modifier isBetInFuture(uint _settlementDate) {
        require(_settlementDate > block.timestamp, "You can't place a bet in the past.");
        _;
    }

    modifier isBetReadyToSettle(uint _betIndex) {
        require(bets[_betIndex].settlementDate < block.timestamp, "Bet isn't ready to be settled.");
        _;
    }

    modifier isPriceFeedWhitelisted(address _priceFeed) {
        require(priceFeeds[_priceFeed], "This pricefeed isn't whitelisted.");
        _;
    }

    /// @notice Whitelists pricefeeds to create bets.
    /// @param _priceFeeds Address for Chainlink Price Feed.
    function whitelistPriceFeeds(address[] memory _priceFeeds) external onlyOwner {
        for (uint i = 0; i < _priceFeeds.length; i++) {
            priceFeeds[_priceFeeds[i]] = true;
        }
    }

    /// @notice Creates an unchallenged bet.
    /// @param _priceFeed Address for a Chainlink Price Feed.
    /// @param _bullish Boolean for bet sentiment, false would be bullish.
    /// @param _betSize The size of the wager that has to be matched to incentivize someone to challenge the bet.
    /// @param _spreadPrice The price the token needs to reach before the settle date.
    /// @param _settlementDate The earliest day a bet can be settled.
    function createBet(
        AggregatorV3Interface _priceFeed,
        bool _bullish,
        uint _betSize,
        uint _heartBeat,
        int _spreadPrice,
        uint _settlementDate
    ) external
    isBetInFuture(_settlementDate)
    isPriceFeedWhitelisted(address(_priceFeed)) {
        Bet memory bet = Bet({
            betCreator: msg.sender,
            betChallenger: address(0),
            priceFeed: _priceFeed,
            bullish: _bullish,
            isSettled: false,
            betSize: _betSize,
            heartBeat: _heartBeat,
            spreadPrice: _spreadPrice,
            settledPrice: 0,
            settlementDate: _settlementDate
        });

        bets.push(bet);

        userBets[msg.sender].push(bet);

        daiIERC20.transferFrom(msg.sender, address(this), _betSize);
        emit LogBetCreated(bets.length + 1);
    }

    /// @notice Allows for a user to challenge a bet, but checks for if the bet
    /// exists first, then if the bet is able to be challenged.
    /// @param _betIndex To grab the bet from the array of bets.
    function challengeBet(uint _betIndex) external
        betExists(_betIndex)
        isBetValid(_betIndex)
        isBetOpen(_betIndex)
        isBetUnchallenged(_betIndex)
    {
        bets[_betIndex].betChallenger = msg.sender;

        userBets[msg.sender].push(bets[_betIndex]);

        daiIERC20.transferFrom(msg.sender, address(this), bets[_betIndex].betSize);

        emit LogBetChallenged(_betIndex);
    }

    /// @notice Allows for either user to settle the bet, then if the bet is able to be challenged.
    /// @param _betIndex To grab the bet from the array of bets.
    function settleBet(uint _betIndex) external
        isBetOpen(_betIndex)
        isBetReadyToSettle(_betIndex)
    {
        (int currentPrice, uint updatedAt) = getLatestPrice(bets[_betIndex].priceFeed);

        require(block.timestamp - updatedAt < bets[_betIndex].heartBeat, "The price feed is lagging. Can't settle this bet yet.");

        bets[_betIndex].isSettled = true;
        bets[_betIndex].settledPrice = currentPrice;

        if (currentPrice > bets[_betIndex].spreadPrice) {
            if (bets[_betIndex].bullish) {
                daiIERC20.transfer(bets[_betIndex].betCreator, bets[_betIndex].betSize * 2);
            } else {
                daiIERC20.transfer(bets[_betIndex].betChallenger, bets[_betIndex].betSize * 2);
            }
        } else if (currentPrice < bets[_betIndex].spreadPrice) {
            if (!bets[_betIndex].bullish) {
                daiIERC20.transfer(bets[_betIndex].betChallenger, bets[_betIndex].betSize * 2);
            } else {
                daiIERC20.transfer(bets[_betIndex].betCreator, bets[_betIndex].betSize * 2);
            }
        } else {
            daiIERC20.transfer(bets[_betIndex].betChallenger, bets[_betIndex].betSize);
            daiIERC20.transfer(bets[_betIndex].betCreator, bets[_betIndex].betSize);
        }

        emit LogBetSettled(_betIndex);
    }

    /// @notice Calls `latestRoundData` from the Chainlink AggregatorV3Interface.
    /// @param _priceFeed Contract address for a price feed.
    /// @return int for updated price in current round, uint for timestamp when round was completed.
    function getLatestPrice(AggregatorV3Interface _priceFeed) public view returns (int, uint) {
        (, int price,, uint updatedAt,) = _priceFeed.latestRoundData();
        return (price, updatedAt);
    }

    /// @notice Returns all the bets ever created.
    /// @return An array of bets.
    function fetchBets() external view returns (Bet[] memory) {
        return bets;
    }
}
