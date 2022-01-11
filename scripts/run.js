const main = async () => {
    const [owner, random] = await hre.ethers.getSigners();
    // compile contract to make artifact ABI
    // HRE = Hardhat runtime environment = Hardhat
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    // Hardhat will make a fresh local blockchain and deploy the contract
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    // Check if contract actually deployed
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount = await waveContract.getTotalWave();
    console.log("Contract total wave is ", waveCount.toNumber());

    let waveTxn = await waveContract.wave("Hey I've just waved ju")
    // wait for txn to be mined
    await waveTxn.wait()
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    waveTxn = await waveContract.wave("Hey I've just waved ju #2")
    // wait for txn to be mined
    await waveTxn.wait()
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};
  
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
  
runMain();