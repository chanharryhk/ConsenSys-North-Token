var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "pass rapid survey essence radio moral panic primary mask hybrid nephew push";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"),
      network_id: 3
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/"),
      network_id: 4
    }
  }
};
// ravine granny geranium oversweet providing dedicator anaerobic amiss crawfish cornbread stainless goldfish
