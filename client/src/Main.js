import React from 'react';
import BuyForm from './BuyForm';

function Main() {
  return (
    <div id='content' className='mt-3'>
      <div className='d-flex justify-content-between mb-3'>
        <button className='btn btn-light'>Buy</button>
        <span className='text-muted'>&lt; &nbsp; &gt;</span>
        <button className='btn btn-light'>Sell</button>
      </div>

      <div className='card mb-4'>
        <div className='card-body'>
          <BuyForm />
        </div>
      </div>
    </div>
  );
}

export default Main;
