// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract JosephToken{
    // Token name
    string public name = 'JosephToken';
    // Token Symbol
    string public symbol = 'JOT';
    // Token total supply
    uint public totalSupply;
    // Token holders address
    mapping(address => uint256) private balances;

    constructor(uint _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }

    function getTotalSupply() public view returns(uint){
        return totalSupply;
    }

    function balanceOf(address _account) public view returns (uint256) {
        return balances[_account];
    }
}