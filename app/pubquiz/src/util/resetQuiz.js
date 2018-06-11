// import crypto from 'crypto';

// import Web3 from 'web3';
// import bip39 from 'bip39';
// import hdkey from 'ethereumjs-wallet/hdkey';

const secretQuizinfo = require('./20180320-quiz.json'); // XXX this is a copy!
// console.log(JSON.stringify(secretQuizinfo,null,1))

// const infura_apikey    = 'sCQUO1V3FOoOUWGZBtig';
// const provider         = new Web3.providers.HttpProvider('https://ropsten.infura.io/'+infura_apikey);
// // const web3             = new Web3(provider);
// const contract         = require('truffle-contract');
// const pubquizJSON      = require('./Pubquiz.json') // XXX this is a copy of the ABI!
// const pubquizContract  = contract(pubquizJSON);
// pubquizContract.setProvider(provider);
// global.pubquizContract = pubquizContract;
// console.log('pubquizContract.isDeployed()', pubquizContract.isDeployed())

// var pubquiz;
// pubquizContract.deployed().then(instance => {
//   pubquiz = instance;
//   global.pubquiz = instance;
// });

// const IPFS_GATEWAY = 'https://gateway.ipfs.io/ipfs/'

// const dummyPubquiz = {
//   "rounds": [
//     {
//       "title": "",
//       // "questionsDecrypted": [""],
//       // "answersDecrypted": [""],
//       // "playerAnswer": [""],
//     }
//   ]
// }

const resetQuiz = (store) => {
    // console.log('resetQuiz')
    // TODO: get the pubquiz from the smart contract (get the actual questions and answers from ipfs)

    store.quiz.reset('Blockchain quiz')
    const rounds = secretQuizinfo.oracleinfo.rounds
    // console.log(rounds.length + ' rounds')

    for (const roundIndex in rounds) {
        const round = rounds[roundIndex].info
        // console.log(roundIndex, round.questions)
        const questions = round.questions.map(q => {return {question: q.question, answer: q.answer}})
        store.quiz.addRound(roundIndex, round.title, questions)
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

export default resetQuiz
