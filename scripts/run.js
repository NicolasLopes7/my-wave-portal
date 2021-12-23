const main = async () => {
    const [owner] = await hre.ethers.getSigners()
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()

    console.log("Contract deployed to: ", waveContract.address)
    console.log("Contract deployed by: ", owner.address)

    let waves = []
    waves = await waveContract.getTotalWaves()

    let waveTxn = await waveContract.wave()
    await waveTxn.wait()

    waves = await waveContract.getTotalWaves()
    
    console.log(waves)
}

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