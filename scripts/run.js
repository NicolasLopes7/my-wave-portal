const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log('Contract addy:', waveContract.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.length);


    let waveTxn = await waveContract.wave('A message!');
    await waveTxn.wait();
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
    await waveTxn.wait();
    let allWaves = await waveContract.getTotalWaves();
    console.log(allWaves);
};

const run = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

run()