// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './JosephToken.sol';


contract JosephSwap {
    address public admin;
    string public name = 'JosephSwap Exchange';
    JosephToken public token;

    constructor(JosephToken _token){
        admin = msg.sender;
        token = _token;
    }
}