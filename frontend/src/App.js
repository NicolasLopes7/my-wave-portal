import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import './App.css';
import { abi } from "./utils/WavePortal.json"

const contractInfo = {
  address: '0xC71Fb5F58115481d1bBA1f70E439Dd9a050aaCEd',
  abi
}

export default function App() {
  const [_, setCurrentAccount] = useState("");
  const [waves, setWaves] = useState([])
  const [pendingTrx, setPendingTrx] = useState('')
  const [message, setMessage] = useState('')

  const getInteractionButtonText = () => {
    if (!pendingTrx) return 'Wave at me'
    else if (pendingTrx === 'error') return 'An error occurred on process your transaction'
    else return 'Your transaction are being processed'
  }

  const castWave = (wave) => ({
    address: wave.waver,
    timestamp: new Date(wave.timestamp * 1000),
    message: wave.message
  })

  const onNewWave = (wave) => {
    const newWave = castWave(wave)
    setWaves(prev => [newWave, ...prev])
  }

  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    return new ethers.Contract(
      contractInfo.address,
      contractInfo.abi,
      signer
    )
  }

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) return;

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length === 0) {
      const [account] = await ethereum.request({ method: "eth_requestAccounts" })
      setCurrentAccount(account)
      getWaves();
      return
    }

    setCurrentAccount(accounts[0])
    getWaves();
    const wavePortalContract = getContract()

    wavePortalContract.on('NewWave', onNewWave);

  }


  const getWaves = async () => {
    const wavePortalContract = getContract()
    const waves = await wavePortalContract.getTotalWaves()
    setWaves(waves.map(castWave).reverse())
  }

  const handleWave = async () => {
    if (!pendingTrx) return await wave()
    else window.open(`https://rinkeby.etherscan.io/tx/${pendingTrx}`, '_blank', 'noopener,noreferrer')
  }

  const wave = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const wavePortalContract = getContract()
        const waveTrx = await wavePortalContract.wave(message)
        setPendingTrx(waveTrx.hash)

        try {
          await waveTrx.wait()
          setPendingTrx('')
        } catch (error) {
          console.error('An error ocurred: ', error)
        }
      }
    } catch (error) {

    }
  }

  const handleMessage = (e) => setMessage(e.target.value)

  useEffect(() => {
    checkIfWalletIsConnected();
    return () => {
      const contract = getContract()
      if (contract) contract.off('NewWave', onNewWave)
    }
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span role='img'>👋</span> <span> Hey there!</span>
        </div>

        <div className="bio">
          my name is nicolas and i'm 17 years. <br />
          currently i work as mid software engineer at <a href="https://pagar.me">pagar.me</a> a brazilian fintech!<br />
          send some eth and wave at me below!!
        </div>

        <div className="message-container">
          <input type="text" value={message} placeholder='type your message here' onChange={handleMessage} className='message-input' />
          <button className="waveButton" onClick={handleWave}>
            {getInteractionButtonText()}
          </button>
        </div>

        {waves.map((wave) => (
          <div key={wave.address + wave.timestamp} className="card" >
            <div className="card-header">
              <span className="address">{wave.address}</span>
            </div>
            <div>
              <span>Message: {wave.message}</span>
            </div>
            <div className="card-footer">
              <span className="timestamp">{wave.timestamp.toLocaleString('pt-Br', { timeZone: 'America/Sao_Paulo' })}</span>
            </div>
          </div>
        ))}
      </div>
    </div >
  );
}
