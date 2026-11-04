const { ethers } = require("hardhat");

async function main() {

    console.log("Deploying LoR Smart Contract...");

    // Get deployer account
    const [deployer] = await ethers.getSigners();

    console.log("Deploying account:", deployer.address);

    // Check Sepolia balance
    const balance = await ethers.provider.getBalance(deployer.address);

    console.log(
        "Account balance:",
        ethers.formatEther(balance),
        "ETH"
    );

    // Get contract factory
    const LoR = await ethers.getContractFactory("LoR");

    // Deploy contract
    const lor = await LoR.deploy();

    await lor.waitForDeployment();

    // Get deployed address
    const contractAddress = await lor.getAddress();

    console.log("----------------------------------");
    console.log("LoR Contract Successfully Deployed!");
    console.log("Contract Address:", contractAddress);
    console.log("----------------------------------");

    console.log(
        "Owner:",
        await lor.owner()
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});