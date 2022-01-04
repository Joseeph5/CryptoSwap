import React, { Fragment, useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
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
      <Nav
        fill
        variant='tabs'
        defaultActiveKey='buy'
        onSelect={(selectedKey) => setForm(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey='buy'>buy</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey='sell'>Sell</Nav.Link>
        </Nav.Item>
        {/* <Nav.Item>
          <Nav.Link eventKey='stack'>Stack</Nav.Link>
        </Nav.Item> */}
      </Nav>
      <br></br>
      <div id='content' className='mt-3'>
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
