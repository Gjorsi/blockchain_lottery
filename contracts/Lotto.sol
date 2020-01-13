pragma solidity ^0.5.3;

contract Lotto {
  uint contributors = 0;
  address payable[2] private users;

  function check() external view returns (bool bet_waiting, uint256 amount){
    return (contributors == 1, address(this).balance);
  }

  function() external payable {
    users[contributors++] = msg.sender;

    if (contributors > 1) {
      drawWinner();
    }
  }

  function drawWinner() private {
    uint random = uint(blockhash(block.number-1))%2;

    users[random].transfer(address(this).balance);

    contributors = 0;
    delete users;
  }
}
