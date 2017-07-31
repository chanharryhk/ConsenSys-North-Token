var HumanStandardToken = artifacts.require("./HumanStandardToken.sol");

module.exports = function(deployer) {
  deployer.deploy(HumanStandardToken, 2000000000, "ConsenSys North Coin", 18, "CN");
};
