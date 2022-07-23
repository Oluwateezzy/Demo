// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "../lesson1/SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    function store(uint256 _favouriteNumber) public override{
        favoriteNumber = _favouriteNumber + 5;
    }
}