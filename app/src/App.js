import React, { useEffect, useState } from 'react';
import './App.css';
import CandyMachine from './CandyMachine';

const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);
  
  const checkIfWalletConnected = async () => {
    try {
      const { solana } = window;

      if(solana && solana.isPhantom) {
        console.log('Phantom wallet found!');

        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with public key: ',
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const connectWallet = async () => {
    const { solana } = window;

    if(solana) {
      const response = await solana.connect();
      console.log(' Connected with public key: ', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };


  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}>Connect To Wallet</button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletConnected();
    }
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🏎 NFT Drop</p>
          <p className="sub-text">Collect a Car NFT</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
      </div>
    </div>
  );
};

export default App;
