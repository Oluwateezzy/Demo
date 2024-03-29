// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;


contract SimpleStorage {
    uint256 public favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people;

    mapping(string => uint256) public nameToFavouriteNumber;

    function store(uint256 _favoriteNumber) public virtual{
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns(uint256){
        return favoriteNumber;
    }

    function addperson(string memory _name, uint256 _favoriteNumber)public {
        People memory newPerson = People(_favoriteNumber, _name);
        people.push(newPerson);
        nameToFavouriteNumber[_name] = _favoriteNumber; 
    }
}