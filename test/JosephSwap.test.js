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
  });
});
