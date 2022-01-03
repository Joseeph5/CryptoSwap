import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

import Main from './Main';
import NavBar from './NavBar';
// contracts
import Token from './contracts/JosephToken.json';
import Swap from './contracts/JosephSwap.json';

function App() {
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('');

  const web3 = new Web3('http://localhost:7545');

  const loadWeb3 = async () => {
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts[0]);
    setAccount(accounts[0]);

    let ethBalance = await web3.eth.getBalance(accounts[0]);
    ethBalance = await web3.utils.fromWei(ethBalance, 'ether');
    // console.log(ethBalance);
    setEthBalance(ethBalance);
  };

  const loadToken = async () => {};

  const loadBlockchainData = async () => {
    // load Token
    const tokenABI = Token.abi;
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (!tokenData) {
      window.alert(
        'Token contract not deployed to this network.\nPlease choose Rinkeby or Ganache test network.'
      );
      return;
    }
    const token = new web3.eth.Contract(tokenABI, tokenData.address);
    console.log('Token: ', token);

    // load swap
    const swapABI = Swap.abi;
    const swapData = Swap.networks[networkId];
    if (!swapData) {
      window.alert(
        'Swap contract not deployed to this network.\nPlease choose Rinkeby or Ganache test network.'
      );
      return;
    }
    const swap = new web3.eth.Contract(swapABI, swapData.address);
    console.log('Swap: ', swap);
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  });
  return (
    <div>
      <NavBar account={account} />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main
            role='main'
            className='col-lg-12 ml-auto mr-auto'
            style={{ maxWidth: '600px' }}>
            <div className='content mr-auto ml-auto'>
              <Main />
              Your account is: {account}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
