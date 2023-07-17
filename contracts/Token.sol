//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract Token {
    string public name = "HT";

    uint public totalSupply = 10000;
    
    address public owner;
    
    mapping(address => uint) balances;
    
    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
    
    function transfer(address to, uint amount) external {
        console.log("**%s transferring %s hToken to %s**",msg.sender,amount,to);
        console.log(address(0)); //trying "not a valid address", no relation to the code
        require(balances[msg.sender]>= amount, "not enough balance to tranfer");
        balances[msg.sender] -= amount;
        balances[to]+= amount;
    }
    
    function balanceOf (address account) external view returns(uint){
        return balances[account];
    }
}   