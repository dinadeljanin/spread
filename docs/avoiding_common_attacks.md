# Avoiding Common Attacks
<sub><sup>(or at least hoping to)</sup></sub>

## [SWC-103: Floating Pragma](https://swcregistry.io/docs/SWC-103)
---
`Spread.sol` was written for Solidity version **0.8.7**.

## [SWC-123: Requirement Violation](https://swcregistry.io/docs/SWC-123) and Use Modifiers Only for Validations
---
#### `betExists`
```solidity
modifier betExists(uint _betIndex) {
    require(_betIndex < bets.length, "Bet doesn't exist");
    _;
}
```
- Checks to see if a bet that a user wishes to challenge can be found in the `bets` array.

#### `isBetOpen`
```solidity
modifier isBetOpen(uint _betIndex) {
    require(bets[_betIndex].isSettled == false, "Bet has already been settled.");
    _;
}
```
- This checks if the bet hasn't been settled already, preventing it from being settled again.

#### `isBetValid`
```solidity
modifier isBetValid(uint _betIndex) {
    require(bets[_betIndex].betCreator != address(0), "Bet isn't valid.");
    require(bets[_betIndex].betCreator != msg.sender, "You can't challenge yourself, silly.");
    _;
}
```
- Ensures that the bet wasn't created by `address(0)`, so it has a creator, but also when it's being challenged, that it isn't being challenged by the user that created it.

#### `isBetUnchallenged`
```solidity
modifier isBetUnchallenged(uint _betIndex) {
    require(bets[_betIndex].betChallenger == address(0), "Bet has already been challenged.");
    _;
}
```
- Each bet is created with `address(0)` as its challenger. When a bet is challenged, `betChallenger` is updated with the address of the user that called `challengeBet`. This makes sure that a bet that's already been challenged, cannot be challenged again by a third party.

#### `isBetReadyToSettle`
```solidity
modifier isBetReadyToSettle(uint _betIndex) {
    require(bets[_betIndex].settlementDate < block.timestamp, "Bet isn't ready to be settled.");
    _;
}
```
- Checks if the timestamp of the settle date is "less" than the the current block timestamp meaning the correct amount of time has elapsed since the bet was placed, and it is now ready to be settled.

#### `isBetInFuture`
```solidity
modifier isBetInFuture(uint _settlementDate) {
    require(_settlementDate > block.timestamp, "You can't place a bet in the past.");
    _;
}
```
- Restricts user from placing a bet in the past.

#### Price Feed Lag
```solidity
require(block.timestamp - updatedAt < 3600, "The price feed is lagging. Can't settle this bet yet.");
```
- If high gas prices prevent the price feeds from updating every hour, bets can't be settled. `updatedAt` is returned from `getLatestPrice` which called `getLatestRound` from the AggregatorV3Interface. If the difference between the current block timestamp and `updatedAt` is greater than 3600 seconds, then the price feed hasn't updated, and the current price won't be valid to settle the bet at.

#### `isPriceFeedWhitelisted`
```solidity
modifier isPriceFeedWhitelisted(address _priceFeed) {
    require(priceFeeds[_priceFeed], "This pricefeed isn't whitelisted.");
    _;
}
```
- `whitelistPriceFeeds` is a function that's restricted to the owner. When called, it takes an array of pricefeeds from Chainlink and adds it to a mapping of whitelisted addresses. This checks if the `_priceFeed` passed into `createBet` is in that mapping, if not, then the bet can't be placed.

## [SWC-128: Pull Over Push](https://swcregistry.io/docs/SWC-128)
---
While `createBet`, `challengeBet`, and `settleBet` handle Dai at some point in their lifecycle, it's only `challengeBet` and `settleBet` that have to face the wrath of scrupulous modifiers that judge the validity of their external inputs.

For `challengeBet`, Dai isn't transferred until after the modifiers are appeased, and only then, we have to set the `betChallenger` to be who called this function.

For `settleBet`, the current price has to be grabbed from the `AggregatorV3Interface` and only then is the Dai transferred to the winner of the bet.

## [SWC-116: Timestamp Dependence](https://swcregistry.io/docs/SWC-116)
---
Each bet is created with a `settlementDate` which is any time in the future. And when it comes time to settle that bet, the `settlementDate` is compared against `block.timestamp` to confirm the blessed day has come to settle this bet once and for all-- *I sure hope you've DYOR*. The result doesn't need to be precise, it just needs to prove that the correct amount of time has elapsed. Which can be risky, because a malicious miner has leeway of about 15 seconds to alter the timestamp of their block.

But, this requires them knowing exactly what the token price is going to be the moment the bet is ready to settle. If a user's prediction leans more on the aggressive side, it would require a biblical level of market manipulation and perhaps a flash loan, and even then that's not guaranteed to go in the miner's favor, especially not once you consider how aggressive that bet was or how quickly a price change can be reflected on exchanges in 15 seconds, because on the opposing side, a user could be ready to trigger `settleBet` and beat the miner to the chase. Like a game of chicken.

## [SWC-107: Reentrancy](https://swcregistry.io/docs/SWC-107)
---
The modifier `isBetOpen` relies on `isSettled`, which until a bet is settled, will be false. But right away, the bet is set to true. The Dai is then sent to whoever won, unless it was a tie, then everyone gets their money back.

The modifier prevents the bet from being re-settled by either user after it's already been settled.
