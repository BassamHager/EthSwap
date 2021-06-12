pragma solidity ^0.5.0;

import './Token.sol';

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  uint public rate = 100;

  event TokenPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  constructor(Token _token) public{
    token = _token;
  }

  function buyTokens() public payable {
    // calc number of tokens to buy
    uint tokenAmount = msg.value * rate;

    // require EthSwap has enough tokens
    require(token.balanceOf(address(this)) >= tokenAmount);
    
    // transfer tokens to user
    token.transfer(msg.sender, tokenAmount);

    // emit an event
    emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
  }

  
  
}