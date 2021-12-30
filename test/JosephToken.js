const JosephToken = artifacts.require('./JosephToken');
let instance;
// async/await code:
contract('JosephToken', (accounts) => {
  beforeEach(async () => {
    instance = await JosephToken.deployed();
  });

  it('total supply test passed 🎉', async () => {
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 1000000);
  });

  it('name and symbol test passed 🎉', async () => {
    const name = await instance.name();
    const symbol = await instance.symbol();
    assert.equal(name, 'JosephToken');
    assert.equal(symbol, 'JOT');
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
