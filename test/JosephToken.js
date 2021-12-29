const JosephToken = artifacts.require('./JosephToken');

// async/await code:
contract('JosephToken', (accounts) => {
  it('total supply test passed', async () => {
    const instance = await JosephToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(totalSupply.toNumber(), 1000000);
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
