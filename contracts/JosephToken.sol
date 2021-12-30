// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract JosephToken{
    // Token name
    string public name = 'JosephToken';
    // Token Symbol
    string public symbol = 'JOT';
    // Token total supply
    uint256 public totalSupply;
    // Token holders address
    mapping(address => uint256) private balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balances[msg.sender] = _initialSupply;
    }

    function getTotalSupply() public view returns(uint256){
        return totalSupply;
    }

    function balanceOf(address _account) public view returns (uint256) {
        return balances[_account];
    }

    function decimals() public pure returns (uint8) {
        return 18;
    }

    function transfer(address _to, uint256 _value) public returns (bool){
        uint256 senderBalance = balances[msg.sender];
        require(senderBalance >= _value,"ERC20: transfer amount exceeds balance");

        unchecked {
            balances[msg.sender] = senderBalance - _value;
        }
        balances[_to] += _value;

        emit Transfer(msg.sender,_to,_value);

        return true;
    }
}