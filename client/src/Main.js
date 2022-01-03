import React from 'react';
import BuyForm from './BuyForm';

function Main({ token, ethBalance, tokenBalance, account, loading }) {
  console.log(ethBalance);

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
          <button className='btn btn-light'>Buy</button>
          <span className='text-muted'>&lt; &nbsp; &gt;</span>
          <button className='btn btn-light'>Sell</button>
        </div>

        <div className='card mb-4'>
          <div className='card-body'>
            <BuyForm ethBalance={ethBalance} tokenBalance={tokenBalance} />
          </div>
        </div>
      </div>
      Your account is: {account}
    </div>
  );
}

export default Main;
