pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 prizeAmount = 0.0001 ether;
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    event NewWave(Wave newWave);
    Wave[] totalWaves;

    constructor() payable {
        console.log("hey am smart and im a contract :p");
    }

    function wave(string memory _message) public {
        Wave memory createdWave = Wave(msg.sender, _message, block.timestamp);
        totalWaves.push(createdWave);
        emit NewWave(createdWave);

        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw moeny from contract.");
    }

    function getTotalWaves() public view returns (Wave[] memory) {
        return totalWaves;
    }
}
