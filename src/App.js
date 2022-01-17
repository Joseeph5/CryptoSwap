import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Web3 from 'web3';

import Main from './Main';
import NavBar from './NavBar';
// contracts
import Token from './contracts/JosephToken.json';
import Swap from './contracts/JosephSwap.json';

function App() {
  const [account, setAccount] = useState('');
  const [ethBalance, setEthBalance] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [token, setToken] = useState(null);
  const [swap, setSwap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [chainId, setChainId] = useState('');

  let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
  window.web3 = web3;

  // console.log('window.ethereum', window.ethereum);

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', function (accounts) {
      if (accounts) {
        setAccount(accounts[0]);
      }
    });

    window.ethereum.on('chainChanged', (chainId) => {
      setChainId(chainId);
    });
  }

  const loadBlockchainData = async () => {
    // load Accounts
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);

    let ethBalance = await web3.eth.getBalance(accounts[0]);
    ethBalance = web3.utils.fromWei(ethBalance, 'ether');
    setEthBalance(ethBalance);

    // load Token
    const tokenABI = Token.abi;
    const networkId = await web3.eth.net.getId();
    const tokenData = Token.networks[networkId];
    if (!tokenData) {
      setStatus(false);
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ganache test network.'
      );
      return;
    }
    const token = new web3.eth.Contract(tokenABI, tokenData.address);
    // console.log('Token: ', token);
    setToken(token);

    let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);

    // load swap
    const swapABI = Swap.abi;
    const swapData = Swap.networks[networkId];
    if (!swapData) {
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ganache test network.'
      );
      return;
    }
    const swap = new web3.eth.Contract(swapABI, swapData.address);
    setSwap(swap);

    setStatus(true);
  };

  const buyToken = async (etherAmount) => {
    if (status === false) {
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ganache test network.'
      );
      return;
    }
    // console.log(swap);
    if (!swap) {
      window.alert('Please deploy the contract to Ganache test network');
      return;
    }
    setLoading(true);

    try {
      const receipt = await swap.methods
        .buyToken()
        .send({ value: etherAmount, from: account });
    } catch (error) {
      console.log('EROOR: ', error);
    }

    let tokenBalance = await token.methods.balanceOf(account).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);

    setLoading(false);
  };

  const sellToken = async (tokenAmount) => {
    if (status === false) {
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ganache test network.'
      );
      return;
    }
    if (!swap) {
      window.alert('Please deploy the contract to Ganache test network');
      return;
    }
    setLoading(true);

    try {
      const approve = await token.methods
        .approve(swap._address, tokenAmount)
        .send({ from: account });
      const receipt = await swap.methods.sellToken(tokenAmount).send({ from: account });
    } catch (error) {
      console.log('EROOR: ', error);
    }

    let tokenBalance = await token.methods.balanceOf(account).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);

    setLoading(false);
  };
  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line
  }, [account, tokenBalance, chainId]);

  return (
    <Router>
      <Fragment>
        <NavBar account={account} />
        <div className='container-fluid mt-5'>
          <div className='row'>
            <main
              role='main'
              className='col-lg-12 ml-auto mr-auto'
              style={{ maxWidth: '600px' }}>
              <Main
                token={token}
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                account={account}
                loading={loading}
                buyToken={buyToken}
                sellToken={sellToken}
              />
            </main>
          </div>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
