import Web3 from 'web3';

import { asJSON } from '../ipfsInterface'
import { generateKeys } from '../smartcontractInterface'

const DEVMODE          = true
const providerUrl      = DEVMODE ? 'http://localhost:9545' : 'https://ropsten.infura.io/sCQUO1V3FOoOUWGZBtig'

export const loadPubquizContract = async (store) => {
  // first attempt to get contract info
  var contractinfo = await asJSON(store.quiz.contractinfohash);

  // create contract instance
  const provider         = new Web3.providers.HttpProvider(providerUrl);
  const contract         = require('truffle-contract');
  const pubquizContract  = contract(contractinfo);

  pubquizContract.setProvider(provider);
  global.pubquizContract = pubquizContract;

  pubquizContract.deployed().then(instance => {
      var info = generateKeys(global.store.team.seed, 0);
      pubquizContract.defaults({from: info.address, gas: 1 * 750000, gasPrice: 5 * 2000000000});

      global.pubquiz = instance;
      console.log('Pubquiz.sol is initialized at', instance.address, 'on', providerUrl)
  }).catch(e => {
    global.pubquiz = undefined;
    console.error('Pubquiz.sol is not deployed on', providerUrl, ' . Error:', e.message)
  })
}

export default loadPubquizContract;
