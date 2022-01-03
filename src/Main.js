import React, { useState } from 'react';
import BuyForm from './BuyForm';
import SellForm from './SellForm';

function Main({ buyToken, ethBalance, tokenBalance, account, loading, sellToken }) {
  const [form, setForm] = useState('buy');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='content mr-auto ml-auto'>
      <div id='content' className='mt-3'>
        <div className='d-flex justify-content-between mb-3'>
          <button
            className='btn btn-light'
            onClick={() => {
              setForm('buy');
            }}>
            Buy
          </button>
          <span className='text-muted'>&lt; &nbsp; &gt;</span>
          <button
            className='btn btn-light'
            onClick={() => {
              setForm('sell');
            }}>
            Sell
          </button>
        </div>

        <div className='card mb-4'>
          <div className='card-body'>
            {form === 'buy' ? (
              <BuyForm
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                buyToken={buyToken}
              />
            ) : (
              <SellForm
                ethBalance={ethBalance}
                tokenBalance={tokenBalance}
                sellToken={sellToken}
              />
            )}
          </div>
        </div>
      </div>
      Your account is: {account}
    </div>
  );
}

export default Main;
