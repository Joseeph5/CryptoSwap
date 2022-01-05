import React, { useState } from 'react';
import tokenLogo from './assets/token-logo.png';
import ethLogo from './assets/eth-logo.png';

function BuyForm({ ethBalance, tokenBalance, buyToken }) {
  const [etherAmount, setEtherAmount] = useState('');

  const hundleSubmit = (e) => {
    e.preventDefault();
    let etherAmountInWei = e.target.buy.value;
    etherAmountInWei = window.web3.utils.toWei(etherAmountInWei, 'Ether');
    buyToken(etherAmountInWei);
  };
  return (
    <form
      className='mb-3'
      onSubmit={(e) => {
        hundleSubmit(e);
      }}>
      <div>
        <label className='float-left'>
          <b>Input</b>
        </label>
        <span className='float-right text-muted'>Balance: {ethBalance}</span>
      </div>
      <div className='input-group mb-4'>
        <input
          type='text'
          onChange={(e) => {
            const etherAmount = e.target.value;
            setEtherAmount(etherAmount * 100);
          }}
          className='form-control form-control-lg'
          placeholder='0'
          name='buy'
          required
        />
        <div className='input-group-append'>
          <div className='input-group-text'>
            <img src={ethLogo} height='32' alt='' />
            &nbsp;ETH
          </div>
        </div>
      </div>
      <div>
        <label className='float-left'>
          <b>Output</b>
        </label>
        <span className='float-right text-muted'>Balance: {tokenBalance}</span>
      </div>
      <div className='input-group mb-2'>
        <input
          type='text'
          className='form-control form-control-lg'
          placeholder='0'
          value={etherAmount}
          disabled
        />
        <div className='input-group-append'>
          <div className='input-group-text'>
            <img
              style={{ borderRadius: '50px', backgroundColor: '#2B354E', padding: '3px' }}
              src={tokenLogo}
              height='32'
              alt=''
            />
            &nbsp; JOT
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <span className='float-left text-muted'>Exchange Rate</span>
        <span className='float-right text-muted'>1 ETH = 100 JOT</span>
      </div>
      <button type='submit' className='btn btn-primary btn-block btn-lg'>
        SWAP!
      </button>
    </form>
  );
}

export default BuyForm;
