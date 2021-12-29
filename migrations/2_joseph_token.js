const JosephToken = artifacts.require('./JosephToken');

module.exports = function (deployer) {
  deployer.deploy(JosephToken);
};
