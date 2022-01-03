const JosephToken = artifacts.require('./JosephToken');
const JosephSwap = artifacts.require('./JosephSwap');

module.exports = async (deployer) => {
  // Deploy Token
  await deployer.deploy(JosephToken, '1000000000000000000000000');
  const token = await JosephToken.deployed();

  // Deploy JosephSwap
  await deployer.deploy(JosephSwap, token.address);
  const swap = await JosephSwap.deployed();

  // Transfer all tokens to JosephSwap (1 million)
  await token.transfer(swap.address, '1000000000000000000000000');
};
