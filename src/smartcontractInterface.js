//import Web3 from 'web3'
import bip39 from 'bip39'
import hdkey from 'ethereumjs-wallet/hdkey'

// const providerUrl      = DEVMODE ? 'http://localhost:9545' : 'https://ropsten.infura.io/sCQUO1V3FOoOUWGZBtig'
// const provider         = new Web3.providers.HttpProvider(providerUrl);
// const contract         = require('truffle-contract');
// const pubquizJSON      = require('./truffle/build/contracts/Pubquiz.json')
// const pubquizContract  = contract(pubquizJSON);
// pubquizContract.setProvider(provider);
// global.pubquizContract = pubquizContract;

export const generateKeys = (_mnemonic, _slot) => {
    const path = "m/44'/60'/0'/0/" + _slot;
    const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(_mnemonic)).derivePath(path).getWallet();

    return {
        "private": '0x' + wallet.getPrivateKey().toString('hex'),
        "address": '0x' + wallet.getAddress().toString('hex'),
    }
}

// var pubquiz;
//
// pubquizContract.deployed().then(instance => {
//     var info = generateKeys(global.store.team.seed, 0);
//
//     pubquizContract.defaults({from: info.address, gas: 1 * 750000, gasPrice: 5 * 2000000000});
//
//     pubquiz = instance;
//     global.pubquiz = pubquiz;
//     console.log('Pubquiz.sol is deployed at', pubquiz.address, 'on', providerUrl)
// }).catch(e => {
//     pubquiz = undefined
//     global.pubquiz = pubquiz;
//     console.error('Pubquiz.sol is not deployed on', providerUrl, ' . Error:', e.message)
// })

//

export const generatePassword = (nCharacters=8) => {
    const pw = Math.random().toString(36)
    return pw.substring(pw.length - nCharacters)
}
