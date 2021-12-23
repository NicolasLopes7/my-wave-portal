pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    event NewWave(Wave newWave);
    Wave[] totalWaves;
    
    constructor() {
        console.log("hey am smart and im a contract :p");
    }

    function wave(string memory _message) public {
        Wave memory createdWave = Wave(msg.sender, _message, block.timestamp);
        totalWaves.push(createdWave);
        emit NewWave(createdWave);
    }

    function getTotalWaves() public view returns (Wave[] memory) {
        return totalWaves;
    }
}
