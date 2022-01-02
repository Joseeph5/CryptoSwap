const JosephSwap = artifacts.require('./JosephSwap');
const JosephToken = artifacts.require('./JosephToken');

let swap, token;

contract('JosephSwap', (accounts) => {
  beforeEach(async () => {
    token = await JosephToken.deployed();
    swap = await JosephSwap.deployed(token.address);
  });

  describe('JosephSwap development', async () => {
    it('name test passaed 🎉', async () => {
      const name = await swap.name();
      assert.equal(name, 'JosephSwap Exchange');
    });

    it('tarnsfer tokens to swap contract 🎉', async () => {
      await token.transfer(swap.address, '1000000');
      const swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toString(), '1000000');
    });

    it('buy tokens from JosephSwap for a fixed price', async () => {
      const result = await swap.buyToken({
        from: accounts[1],
        value: 1,
      });
      // Check buyer token balance after purchase
      const buyerBalance = await token.balanceOf(accounts[1]);
      assert.equal(buyerBalance.toNumber(), 100);

      // Check JosephSwap balance after purchase
      const swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toNumber(), 999900);

      const ethSwapBalance = await web3.eth.getBalance(swap.address);
      assert.equal(ethSwapBalance.toString(), 1);
      console.log('result ', result.logs[0].args);
    });
  });
});
