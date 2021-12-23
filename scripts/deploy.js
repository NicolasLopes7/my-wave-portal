const deploy = async () => {
    const [deployer] = await hre.ethers.getSigners()
    const accountBalance = await deployer.getBalance()

    console.log('Deploying contracts with account: ', deployer.address);
    console.log('Account balance: ', accountBalance.toString());

    const Token = await hre.ethers.getContractFactory('WavePortal')
    const portal = await Token.deploy()
    await portal.deployed()

    console.log('WavePortal address: ', portal.address)
}

(async () => {
    try {
        await deploy()
        process.exit(0)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()