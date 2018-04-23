// http://truffleframework.com/docs/advanced/configuration>

var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = require('./mnemonic.json');
var infura_apikey="sCQUO1V3FOoOUWGZBtig";

module.exports = {
  networks: {
    ropsten: {
      provider: function() { return new HDWalletProvider(mnemonic.ropsten, "https://ropsten.infura.io/"+infura_apikey) },
      network_id: 3,
      gas: 1000000,
      gasPrice: 10 * 1000000000,
    },
    rinkeby: {
      provider: function() { return new HDWalletProvider(mnemonic.rinkeby, "https://rinkeby.infura.io/"+infura_apikey) },
      network_id: 4,
    },
  },
};
