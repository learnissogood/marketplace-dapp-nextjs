//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarketPlaceCoin is ERC20 {

    constructor () ERC20("MarketPlaceToken", "MPT") {}
    
    function mint(uint256 amount) public payable {
        require(msg.value == amount * 0.0001 ether, "You must send te require eth");
        _mint(msg.sender, amount);
    }

    receive() external payable{}
    fallback() external payable{}

}
