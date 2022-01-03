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
      await token.transfer(swap.address, web3.utils.toWei('1000000', 'Ether'));
      const swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toString(), web3.utils.toWei('1000000', 'Ether'));
    });

    it('buy tokens from JosephSwap for a fixed price 🎉', async () => {
      const result = await swap.buyToken({
        from: accounts[1],
        value: web3.utils.toWei('1', 'Ether'),
      });
      // Check buyer token balance after the purchase
      const buyerBalance = await token.balanceOf(accounts[1]);
      assert.equal(buyerBalance.toString(), web3.utils.toWei('100', 'Ether'));

      // Check JosephSwap balance after the purchase
      const swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toString(), web3.utils.toWei('999900', 'Ether'));

      const ethSwapBalance = await web3.eth.getBalance(swap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei('1', 'Ether'));
    });

    it('sell tokens to JosephSwap for a fixed price 🎉', async () => {
      // seller must approve tokens before the sale process
      await token.approve(swap.address, web3.utils.toWei('100', 'Ether'), {
        from: accounts[1],
      });
      // seller sells tokens
      const result = await swap.sellToken(web3.utils.toWei('100', 'Ether'), {
        from: accounts[1],
      });

      // Check seller token balance after the sale process
      const sellerBalance = await token.balanceOf(accounts[1]);
      assert.equal(sellerBalance.toString(), web3.utils.toWei('0', 'Ether'));

      // check JosephSawp balance after the sale process
      const swapBalance = await token.balanceOf(swap.address);
      assert.equal(swapBalance.toString(), web3.utils.toWei('1000000', 'Ether'));

      const ethSwapBalance = await web3.eth.getBalance(swap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei('0', 'Ether'));
    });
  });
});
