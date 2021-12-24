pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 prizeAmount = 0.0001 ether;
    uint256 private seed;
    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    event NewWave(Wave newWave);
    Wave[] totalWaves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("hey am smart and im a contract :p");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendPrize() private {
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has"
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw moeny from contract.");
    }

    function checkLastWaveByAddress() private {
        require(
            lastWavedAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        lastWavedAt[msg.sender] = block.timestamp;
    }

    function wave(string memory _message) public {
        checkLastWaveByAddress();

        Wave memory createdWave = Wave(msg.sender, _message, block.timestamp);
        totalWaves.push(createdWave);

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            sendPrize();
        }

        emit NewWave(createdWave);
    }

    function getTotalWaves() public view returns (Wave[] memory) {
        return totalWaves;
    }
}
