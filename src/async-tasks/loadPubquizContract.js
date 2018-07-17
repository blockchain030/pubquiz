import Web3 from 'web3';

import { asJSON } from '../ipfsInterface'

const DEVMODE          = true
const providerUrl      = DEVMODE ? 'http://localhost:9545' : 'https://ropsten.infura.io/sCQUO1V3FOoOUWGZBtig'

const watchTeams = (error, result) => {
if (!error) {
    // var { team } = global.store;
    if(result.args._address===global.store.team.address) {
      console.log('jay: we are in the game!');
    } else {
      console.log('another team registered: ', result.args._address, result.args._name);
    }
  } else {
    console.log(error);
  }
}

var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey="sCQUO1V3FOoOUWGZBtig";

// module.exports = {
//   networks: {
//     ropsten: {
//       provider: function() { return new HDWalletProvider(mnemonic.ropsten, "https://ropsten.infura.io/"+infura_apikey) },
//       network_id: 3,
//       gas: 1000000,
//       gasPrice: 10 * 1000000000,
//     },
//     rinkeby: {
//       provider: function() { return new HDWalletProvider(mnemonic.rinkeby, "https://rinkeby.infura.io/"+infura_apikey) },
//       network_id: 4,
//     },
//   },
// };
//

export const loadPubquizContract = async (store) => {
  try {

    // first attempt to get contract info
    console.log('retrieving contract info from ', store.quiz.contractinfohash);

    var contractinfo = await asJSON(store.quiz.contractinfohash);

    // create contract instance
  //  const provider         = new Web3.providers.HttpProvider(providerUrl);
    const provider = new HDWalletProvider(store.team.seed, providerUrl, 0, 1);
    const contract         = require('truffle-contract');
    const pubquizContract  = contract(contractinfo);

    const web3 = new Web3(provider);
    web3.eth.getBalance(provider.getAddress(0), (err, balance) => { console.log(balance.toString())} );

    pubquizContract.setProvider(provider);
    pubquizContract.defaults({from: provider.getAddress(0), gas: 1 * 750000, gasPrice: 5 * 2000000000});

    // global.pubquizContract = pubquizContract;

    pubquizContract.deployed().then(instance => {
        global.newTeamEvent = instance.TeamRegistered();
        global.newTeamEvent.watch(watchTeams);

        global.pubquiz = instance;
        console.log('Pubquiz.sol is initialized at', instance.address, 'on', providerUrl)
    }).catch(e => {
      global.pubquiz = undefined;
      console.error('Pubquiz.sol is not deployed on', providerUrl, ' . Error:', e.message)
    })
  } catch(ex) {
    console.log('loadPubquizContract error:' + ex.message)
  }
}

export default loadPubquizContract;
