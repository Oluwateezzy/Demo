// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "./PriceConverter.sol";
import "./AggregatorV3Interface.sol";

// Get Funds from Users
// Withdraw Funds
// Set a Minimum funding value in USD

error NotOwner();

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIMUM_USD = 50 * 1e18;

    address[] public funders;

    mapping(address => uint256) public addressToAmountFunded;

    address public immutable i_owner;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeeddress) {
        i_owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeeddress);
    }

    function fund() public payable {
        require(
            msg.value.getConversionRate(priceFeed) >= MINIMUM_USD,
            "Didn't send enough"
        );
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
    }

    function withdraw() public {
        for (
            uint256 funderIndex = 0;
            funderIndex < funders.length;
            funderIndex++
        ) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;

            funders = new address[](0);

            // payable(msg.sender).transfer(address(this).balance);

            // // Using send Method
            // bool sendSuccess = payable(msg.sender).send(address(this).balance);
            // require(sendSuccess, "Send Failed");

            // call
            (bool callSuccess, ) = payable(msg.sender).call{
                value: address(this).balance
            }("");
            require(callSuccess, "Send Failed");
        }
    }

    modifier onlyOwner() {
        // require(msg.sender == i_owner, "Sender is not Owner");
        if (msg.sender != i_owner) {
            revert NotOwner();
        }
        _;
    }

    // What happen if someone sends this contract ETH without calling the fund

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}
