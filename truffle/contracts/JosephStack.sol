// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './DaiToken.sol';
import './JosephToken.sol';

contract JosephStack {
    string public name = 'Token Stacker';
    address public owner;
    JosephToken public josephToken;
    DaiToken public daiToken;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (JosephToken _joToken, DaiToken _daiToken)  {
        josephToken = _joToken;
        daiToken = _daiToken;
        owner = msg.sender;
    }
}
