import React, { useState } from 'react';
import tokenLogo from './assets/token-logo.png';
import ethLogo from './assets/eth-logo.png';

function SellForm({ ethBalance, tokenBalance, sellToken }) {
  const [tokenAmount, setTokenAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let tokenAmountInWei = e.target.sell.value;
    tokenAmountInWei = window.web3.utils.toWei(tokenAmountInWei.toString(), 'Ether');

    sellToken(tokenAmountInWei);
  };
  return (
    <form
      className='mb-3'
      onSubmit={(e) => {
        handleSubmit(e);
      }}>
      <div>
        <label className='float-left'>
          <b>Input</b>
        </label>
        <span className='float-right text-muted'>Balance: {tokenBalance}</span>
      </div>
      <div className='input-group mb-4'>
        <input
          type='text'
          className='form-control form-control-lg'
          placeholder='0'
          required
          name='sell'
          onChange={(e) => {
            const tokenAmount = e.target.value;
            setTokenAmount(tokenAmount / 100);
          }}
        />
        <div className='input-group-append'>
          <div className='input-group-text'>
            <img
              src={tokenLogo}
              height='32'
              alt=''
              style={{ borderRadius: '50px', backgroundColor: '#2B354E', padding: '3px' }}
            />
            &nbsp; JOT
          </div>
        </div>
      </div>
      <div>
        <label className='float-left'>
          <b>Output</b>
        </label>
        <span className='float-right text-muted'>Balance: {ethBalance}</span>
      </div>
      <div className='input-group mb-2'>
        <input
          type='text'
          className='form-control form-control-lg'
          placeholder='0'
          value={tokenAmount}
          disabled
        />
        <div className='input-group-append'>
          <div className='input-group-text'>
            <img src={ethLogo} height='32' alt='' />
            &nbsp; ETH
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <span className='float-left text-muted'>Exchange Rate</span>
        <span className='float-right text-muted'>100 JOT = 1 ETH</span>
      </div>
      <button type='submit' className='btn btn-primary btn-block btn-lg'>
        SWAP!
      </button>
    </form>
  );
}

export default SellForm;
