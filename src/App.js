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

    // load Balance
    let ethBalance = await web3.eth.getBalance(accounts[0]);
    ethBalance = web3.utils.fromWei(ethBalance, 'ether');
    setEthBalance(ethBalance);

    // check network
    const networkId = await web3.eth.net.getId();
    if (networkId !== 3) {
      setStatus(false);
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ropston test network.'
      );
      return;
    }
    // load Token
    const tokenABI = Token.abi;

    const token = new web3.eth.Contract(
      tokenABI,
      '0x96Ae6504d6110dBc1c9b68AdE5EBf9Ec89da4644'
    );
    setToken(token);

    let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);

    // load swap
    const swapABI = Swap.abi;

    const swap = new web3.eth.Contract(
      swapABI,
      '0xcA9F4c046fbec2647F6359D8A7CF8B59C1aB6b62'
    );
    // console.log('swap: ', swap._address);
    setSwap(swap);

    if (token && swap) {
      setStatus(true);
    }
  };

  const buyToken = async (etherAmount) => {
    if (status === false) {
      window.alert(
        'The contract is not deployed to this network.\nPlease connect to Ropston test network.'
      );
      return;
    }
    // console.log(swap);
    if (!swap) {
      window.alert('Please deploy the contract to Ropston test network');
      return;
    }
    setLoading(true);

    try {
      const receipt = await swap.methods
        .buyToken()
        .send({ value: etherAmount, from: account, gasLimit: 50000 });
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
