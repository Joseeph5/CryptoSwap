const JosephToken = artifacts.require('../JosephToken');
const JosephSwap = artifacts.require('./JosephSwap');
const JosephStack = artifacts.require('./JosephStack');
const DaiToken = artifacts.require('./DaiToken');

module.exports = async (deployer) => {
  // Deploy Joseph Token
  await deployer.deploy(JosephToken, '1000000000000000000000000');
  const token = await JosephToken.deployed();

  // Deploy Dai Token
  await deployer.deploy(DaiToken, '1000000000000000000000000');
  const daiToken = await DaiToken.deployed();

  // Deploy JosephSwap
  await deployer.deploy(JosephSwap, token.address);
  const swap = await JosephSwap.deployed();

  // Deploy JosephStack
  await deployer.deploy(JosephStack, token.address, daiToken.address);
  const stack = await JosephStack.deployed();

  // Transfer all tokens to JosephSwap (1 million)
  await token.transfer(swap.address, '1000000000000000000000000');
};
