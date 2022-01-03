import React from 'react';
import Identicon from 'identicon.js';

function NavBar({ account }) {
  return (
    <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
      <span className='navbar-brand col-sm-3 col-md-2 mr-0'>JosephSwap</span>

      <ul className='navbar-nav px-3'>
        <li className='nav-item text-nowrap d-none d-sm-none d-sm-block'>
          <small className='text-secondary'>
            <span style={{ fontSize: '18px' }} id='account'>
              {account}
            </span>
          </small>

          {account ? (
            <img
              className='ml-2'
              width='30'
              height='30'
              alt=''
              src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
            />
          ) : (
            <span></span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
