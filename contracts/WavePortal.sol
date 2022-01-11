// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;
import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWave;
    uint256 private seed;
    event NewWave(address indexed from, uint256 timestamp, string message);
    struct Wave {
        address sender;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;
    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Hello World");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, "Must wait 30 seconds before waving again.");
        lastWavedAt[msg.sender] = block.timestamp;

        totalWave+=1;
        console.log("%s wave at you! Message: %s", msg.sender, _message);
        waves.push(Wave(msg.sender, _message, block.timestamp));
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);
        if (seed <=50) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWave() public view returns (uint256) {
        console.log("Total wave is %s", totalWave);
        return totalWave;
    }
}