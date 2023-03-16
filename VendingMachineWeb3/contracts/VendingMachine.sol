// SPDX-License-Identifier: MIT

pragma solidity  ^0.8.19;

contract VendingMachine {
    address public owner;
    mapping(address => uint) public donutBalances;

    constructor()
    {
        owner = msg.sender;
        donutBalances[address(this)] = 100;
    }

    function getVendingMachineBalance() public view  returns (uint)
    {
        return donutBalances[address(this)];
    }
    function restock (uint amount) public {
        require(msg.sender == owner, "Only the owner can restock the machine");
         donutBalances[address(this)] += amount;
    }
    function purchase (uint amount) public payable
    {
        require(msg.value >=  amount * 0.001 ether ,  "It costs 2 ethers per donuts ");
        require(donutBalances[address(this)] >= amount , "Not enough donuts in stock");
        donutBalances[msg.sender] += amount;
        donutBalances[address(this)] -= amount; 
    }
}