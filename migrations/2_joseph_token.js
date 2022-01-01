const JosephToken = artifacts.require('./JosephToken');
const JosephSwap = artifacts.require('./JosephSwap');

module.exports = async (deployer) => {
  await deployer.deploy(JosephToken, 1000000);
  const token = await JosephToken.deployed();

  // Deploy EthSwap
  await deployer.deploy(JosephSwap, token.address);
  const joSwap = await JosephSwap.deployed();
};
