//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * Fake Chainlink AggregatorV3Interface for Smock to test how the actual
 * Chainlink AggregatorV3Interface will interact with Spread.sol.
 * https://smock.readthedocs.io/en/latest/fakes.html
*/
contract MockAggregator is AggregatorV3Interface {
  function decimals() external view override returns (uint8) {}

  /// @dev Returns a string of a token pair with a base currency and a quote currency
  function description() external view override returns (string memory) {}

  function version() external view override returns (uint256) {}

  /// @dev Returns the round data for a specific round
  function getRoundData(uint80 _roundId)
    external
    view
    override
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ) {}

  /// @dev Returns the data from the latest round. In the unit tests, `latestRoundData` returns a specific price with different timestamps
  function latestRoundData()
    external
    view
    override
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ) {}
}
