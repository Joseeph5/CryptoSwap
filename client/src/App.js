import Main from './Main';
import NavBar from './NavBar';
import Web3 from 'web3';
import { useEffect, useState } from 'react';

const web3 = new Web3('http://localhost:7545');

function App() {
  const [account, setAccount] = useState();
  const [ethBalance, setEthBalance] = useState(0);

  const loadWeb3 = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    setAccount(accounts[0]);
  };

  const loadBlockchainData = async () => {
    let ethBalance = await web3.eth.getBalance(account);
    console.log(web3.utils.fromWei(ethBalance, 'ether'));
  };

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  return (
    <div>
      <NavBar account={account} />
      <div className='container-fluid mt-5'>
        <div className='row'>
          <main
            role='main'
            className='col-lg-12 ml-auto mr-auto'
            style={{ maxWidth: '600px' }}>
            <div className='content mr-auto ml-auto'>
              <Main />
              Your account is: {account}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
