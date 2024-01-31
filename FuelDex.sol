// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FuelDex is Ownable {
    using SafeERC20 for IERC20;

    mapping(address => uint256) public balances;

    function deposit(address token, uint256 amount) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
    }

    function withdraw(address token, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        IERC20(token).safeTransfer(msg.sender, amount);
        balances[msg.sender] -= amount;
    }
}
