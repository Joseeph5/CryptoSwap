import Main from './Main';
import NavBar from './NavBar';
// import Web3 from 'web3';
import { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState();

  const loadWeb3 = async () => {
    // const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
    // const accounts = await web3.eth.requestAccounts();
    // setAccount(accounts[0]);
  };

  useEffect(() => {
    loadWeb3();
  }, []);
  return (
    <div>
      <NavBar />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main
            role='main'
            className='col-lg-12 ml-auto mr-auto'
            style={{ maxWidth: '600px' }}>
            <div className='content mr-auto ml-auto'>
              <Main />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
