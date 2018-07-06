import delay from 'await-delay'

// import crypto from 'crypto';

import Web3 from 'web3';
import bip39 from 'bip39';
import hdkey from 'ethereumjs-wallet/hdkey';

const secretQuizinfo = require('./20180320-quiz.json'); // XXX this is a copy!
// console.log(JSON.stringify(secretQuizinfo,null,1))

const DEVMODE          = true

const providerUrl      = DEVMODE ? 'http://localhost:9545' : 'https://ropsten.infura.io/sCQUO1V3FOoOUWGZBtig'
const provider         = new Web3.providers.HttpProvider(providerUrl);
const contract         = require('truffle-contract');
const pubquizJSON      = require('../truffle/build/contracts/Pubquiz.json')
const pubquizContract  = contract(pubquizJSON);
pubquizContract.setProvider(provider);
global.pubquizContract = pubquizContract;

function generateKeys(_mnemonic, _slot) {
    const path = "m/44'/60'/0'/0/" + _slot;
    const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(_mnemonic)).derivePath(path).getWallet();

    return {
        "private": '0x' + wallet.getPrivateKey().toString('hex'),
        "address": '0x' + wallet.getAddress().toString('hex'),
    }
}

var pubquiz;

pubquizContract.deployed().then(instance => {
    var info = generateKeys(global.store.team.seed, 0);

    pubquizContract.defaults({from: info.address, gas: 1 * 750000, gasPrice: 5 * 2000000000});

    pubquiz = instance;
    global.pubquiz = pubquiz;
    console.log('Pubquiz.sol is deployed at', pubquiz.address, 'on', providerUrl)
}).catch(e => {
    pubquiz = undefined
    global.pubquiz = pubquiz;
    console.error('Pubquiz.sol is not deployed on', providerUrl, ' . Error:', e.message)
})

const getQuiz = async (store) => {
    await delay(1000)

    store.quiz.reset('Blockchain quiz')
    const { rounds } = secretQuizinfo.oracleinfo

    for (const roundIndex in rounds) {
        const round = rounds[roundIndex].info
        // console.log(roundIndex, round.questions)
        const questions = round.questions.map(q => {return {question: q.question}})
        store.quiz.pushRound({name:round.title, questions})
    }

    // const pubquizGatewayUrl = IPFS_GATEWAY + secretQuizinfo.playerinfoHash
    // console.log(pubquizGatewayUrl)
    // fetch(pubquizGatewayUrl)
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(JSON.stringify(json,null,1))
    //     this.pubquiz = json

    //     for(var roundidx=0; roundidx<this.pubquiz.rounds.length; roundidx++) {
    //       this.pubquiz.rounds[roundidx].title = 'Round ' + (roundidx + 1) // XXX this is currently missing from the puquiz json in ipfs
    //       this.getRound(roundidx)
    //     }
    //   })
    //   .catch(err => console.error(err));

    // this.round = 0
    // this.question = 0
}

// const decrypt = (text, password, algorithm='aes-256-ctr') => {
//     var decipher = crypto.createDecipher(algorithm,password);
//     var dec = decipher.update(text,'hex','utf8');
//     dec += decipher.final('utf8');
//     return dec;
// }

// const getRound = (roundidx) => {
//     const questionsGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].questions
//     // console.log(roundidx, questionsGatewayUrl)
//     fetch(questionsGatewayUrl)
//         .then(res => res.text())
//         .then(questionsEncrypted => {
//       // console.log(roundidx, questionsGatewayUrl, questionsEncrypted)
//       this.pubquiz.rounds[roundidx].questionsEncrypted = questionsEncrypted
//       this.pubquiz.rounds[roundidx].questionsDecrypted = JSON.parse( this.decrypt(questionsEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordQuestions) )
//       // console.log(JSON.stringify(this.pubquiz,null,1))

//       this.pubquiz.rounds[roundidx].playerAnswer = []
//       for (let n = 0;n < this.pubquiz.rounds[this.round].questionsDecrypted.length;n++) {
//           this.pubquiz.rounds[roundidx].playerAnswer.push('')
//       }
//     })
//     .catch(err => console.error(err))

//     const answersGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].answers
//     // console.log(roundidx, questionsGatewayUrl)
//     fetch(answersGatewayUrl)
//     .then(res => res.text())
//     .then(answersEncrypted => {
//         // console.log(roundidx, answersGatewayUrl, answersEncrypted)
//         this.pubquiz.rounds[roundidx].answersEncrypted = answersEncrypted
//         this.pubquiz.rounds[roundidx].answersDecrypted = JSON.parse( this.decrypt(answersEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordAnswers) )
//         // console.log(JSON.stringify(this.pubquiz,null,1))
//     })
//     .catch(err => console.error(err))

// } // end of getRound(roundidx)

export default getQuiz
