const JosephToken = artifacts.require('./JosephToken');
let token;
// async/await code:
contract('JosephToken', (accounts) => {
  beforeEach(async () => {
    token = await JosephToken.deployed();
  });

  describe('Token deployemnt', async () => {
    it('total supply test passed 🎉', async () => {
      const totalSupply = await token.totalSupply();
      assert.equal(totalSupply.toNumber(), 1000000);
      const ownerBalance = await token.balanceOf(accounts[0]);
      assert.equal(ownerBalance, 1000000);
    });

    it('name and symbol test passed 🎉', async () => {
      const name = await token.name();
      const symbol = await token.symbol();
      assert.equal(name, 'JosephToken');
      assert.equal(symbol, 'JOT');
    });

    it('transaction test passed 🎉', async () => {
      const success = await token.transfer.call(accounts[1], 250000);
      assert.equal(success, true, 'it returns true');
      const receipt = await token.transfer(accounts[1], 250000);
      assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(
        receipt.logs[0].args._from,
        accounts[0],
        'logs the account the tokens are transferred from'
      );
      assert.equal(
        receipt.logs[0].args._to,
        accounts[1],
        'logs the account the tokens are transferred to'
      );
      assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
      const receiverBalance = await token.balanceOf(accounts[1]);
      assert.equal(
        receiverBalance.toNumber(),
        250000,
        'adds the amount to the receiving account'
      );
      const ownerBalance = await token.balanceOf(accounts[0]);
      assert.equal(
        ownerBalance.toNumber(),
        750000,
        'deducts the amount from the sending account'
      );
    });

    it(`can't transfer something larger than the sender's balance 🎉`, async () => {
      try {
        const success = await token.transfer.call(accounts[1], 9999999);
      } catch (error) {
        assert(error.message.indexOf('revert') >= 0);
      }
    });

    it('approve test passed 🎉', async () => {
      const success = await token.approve.call(accounts[1], 250000);
      assert.equal(success, true, 'it returns true');

      const receipt = await token.approve(accounts[1], 250000);
      assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');

      const allowance = await token.allowances(accounts[0], accounts[1]);
      assert.equal(allowance.toNumber(), 250000, 'store the allowed amount');
    });

    it('transferFrom test passed 🎉', async () => {
      const fromAccount = accounts[2];
      const toAccount = accounts[3];
      const spenderAccount = accounts[4];

      const receipt = await token.transfer(fromAccount, 200000);
      const approve = await token.approve(spenderAccount, 200000, {
        from: fromAccount,
      });
      let allowance = await token.allowances(fromAccount, spenderAccount);
      assert.equal(allowance.toNumber(), 200000, 'store the allowed amount');

      const success = await token.transferFrom.call(fromAccount, toAccount, 100000, {
        from: spenderAccount,
      });
      assert.equal(success, true, 'it returns false');
      const transferFrom = await token.transferFrom(fromAccount, toAccount, 100000, {
        from: spenderAccount,
      });
      allowance = await token.allowances(fromAccount, spenderAccount);
      assert.equal(allowance.toNumber(), 100000, 'store the allowed amount');
    });
  });
});

// thenable Code:
// contract('JosephToken', (accounts) => {
//   it('total supply test passed', () => {
//     return JosephToken.deployed()
//       .then((instance) => {
//         token = instance;
//         return token.totalSupply();
//       })
//       .then((totalSupply) => {
//         assert.equal(totalSupply.toNumber(), 1000000);
//       });
//   });
// });
