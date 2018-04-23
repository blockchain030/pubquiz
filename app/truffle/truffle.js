// http://truffleframework.com/docs/advanced/configuration>

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = require('./mnemonic.json');
var infura_apikey="sCQUO1V3FOoOUWGZBtig";

module.exports = {
  networks: {
    ericvrp: {
      host: "ericvrp.xs4all.nl",
      port: 8545,
      network_id: "*", // Match any network id
      // gas: 4600000,
    },
    ropsten: {
      provider: function() { return new HDWalletProvider(mnemonic.ropsten, "https://ropsten.infura.io/"+infura_apikey) },
      network_id: 3,
      gas: 53000,
      gasPrice: 17 * 1000000000,
    },
    rinkeby: {
      provider: function() { return new HDWalletProvider(mnemonic.rinkeby, "https://rinkeby.infura.io/"+infura_apikey) },
      network_id: 4,
    },
  },
};
