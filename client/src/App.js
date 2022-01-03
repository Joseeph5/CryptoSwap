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
  const [tokenBalance, setTokenBalance] = useState('');
  const [token, setToken] = useState(null);
  const [swap, setSwap] = useState(null);
  const [loading, setLoading] = useState(true);

  let web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
  window.web3 = web3;

  window.ethereum.on('accountsChanged', function (accounts) {
    setAccount(accounts[0]);
  });

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
      window.alert(
        'Token contract not deployed to this network.\nPlease choose Rinkeby or Ganache test network.'
      );
      return;
    }
    const token = new web3.eth.Contract(tokenABI, tokenData.address);
    // console.log('Token: ', token);
    setToken(token);

    // console.log(account);
    let tokenBalance = await token.methods.balanceOf(accounts[0]).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);

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
    setSwap(swap);

    setLoading(false);
  };

  const buyToken = async (etherAmount) => {
    setLoading(true);

    const receipt = await swap.methods
      .buyToken()
      .send({ value: etherAmount, from: account });
    setLoading(false);
    console.log(receipt);

    setLoading(false);

    let tokenBalance = await token.methods.balanceOf(account).call();
    tokenBalance = web3.utils.fromWei(tokenBalance, 'ether');
    setTokenBalance(tokenBalance);
  };
  useEffect(() => {
    loadBlockchainData();
    // eslint-disable-next-line
  }, [account, tokenBalance]);

  return (
    <div>
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
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
