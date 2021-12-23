pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    address[] totalWaves;
    constructor() {
        console.log("hey am smart and im a contract :p");
    }

    function wave() public {
        totalWaves.push(msg.sender);
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (address[] memory) {
        console.log("We have %d total waves!", totalWaves.length);
        return totalWaves;
    }
}
