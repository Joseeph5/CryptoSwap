// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './JosephToken.sol';


contract JosephSwap {
    address public admin;
    string public name = 'JosephSwap Exchange';
    JosephToken public token;
    uint rate = 100;

    event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
    );

    event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );

    constructor(JosephToken _token){
        admin = msg.sender;
        token = _token;
    }

    function buyToken() public payable{
        // Calculate the number of tokens to buy
        uint tokenAmount = msg.value * rate;

        // Require that JosephSwap contract has enough tokens
        require(token.balanceOf(address(this)) >= tokenAmount);

        // Transfer tokens to the user
        token.transfer(msg.sender, tokenAmount);

        // Emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    
}