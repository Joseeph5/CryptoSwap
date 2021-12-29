// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract JosephToken{
    uint public totalSupply;

    constructor() {
        totalSupply = 1000000;
    }

    function getTotalSupply() public view returns(uint){
        return totalSupply;
    }
}