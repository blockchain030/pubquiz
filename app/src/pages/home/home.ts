import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Data } from '../../providers/data';
import { RatePage } from '../rate/rate';

import crypto from 'crypto';

import Web3 from 'web3';
// import bip39 from 'bip39';
// import hdkey from 'ethereumjs-wallet/hdkey';

const secretQuizinfo = require('../../../createquiz/quizinfo/20180320-quiz.json');
// console.log(JSON.stringify(secretQuizinfo,null,1))

const provider         = new Web3.providers.HttpProvider("http://ericvrp.xs4all.nl:8545");
const contract         = require('truffle-contract');
const pubquizJSON      = require('../../../../truffle/build/contracts/Pubquiz.json')
const pubquizContract  = contract(pubquizJSON);
global.pubquizContract = pubquizContract;
pubquizContract.setProvider(provider);

var pubquiz;
pubquizContract.deployed().then(instance => {
  pubquiz = instance;
  global.pubquiz = instance;
});

const IPFS_GATEWAY = 'https://gateway.ipfs.io/ipfs/'

const dummyPubquiz = {
  "rounds": [ 
    {
      "title": "",
      // "questionsDecrypted": [""],
      // "answersDecrypted": [""],
      // "playerAnswer": [""],
    }
  ]
}


// const generateKeys = (mnemonic = "extra payment empty slim copper tube limb island swing tell front figure") => {
//   const slot = 0;
//   const path = "m/44'/60'/0'/0/" + slot;
//   const wallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic)).derivePath(path).getWallet();

//   return {
//     // "mnemonic": mnemonic,
//     "private": wallet.getPrivateKey().toString('hex'),
//     "address": wallet.getAddress().toString('hex'),
//   }
// }
// global.generateKeys = generateKeys;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // web3: any;
  
  pubquiz: any;
  round: any;     // index
  question: any;  // index
  // playerAnswer: any[];
  playerUserId = 101;

  constructor (public navCtrl: NavController) {
    // TODO: get the pubquiz from the smart contract (get the actual questions and answers from ipfs)
    
    this.pubquiz = dummyPubquiz  // note: dummy until we receive from the smart contract

    const pubquizGatewayUrl = IPFS_GATEWAY + secretQuizinfo.playerinfoHash
    // console.log(pubquizGatewayUrl)
    fetch(pubquizGatewayUrl)
      .then(res => res.json())
      .then(json => {
        // console.log(JSON.stringify(json,null,1))
        this.pubquiz = json
        
        for(var roundidx=0; roundidx<this.pubquiz.rounds.length; roundidx++) {
          this.pubquiz.rounds[roundidx].title = 'Round ' + (roundidx + 1) // XXX this is currently missing from the puquiz json in ipfs
          this.getRound(roundidx)
        }
      })
      .catch(err => console.error(err));

    // setInterval(() => console.log(JSON.stringify(this.pubquiz,null,1)), 10 * 1000)

    this.round = 0
    this.question = 0
  }

  decrypt = (text, password, algorithm='aes-256-ctr') => {
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
  }
  
  getRound = (roundidx) => {
    const questionsGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].questions
    // console.log(roundidx, questionsGatewayUrl)
    fetch(questionsGatewayUrl)
    .then(res => res.text())
    .then(questionsEncrypted => {
        // console.log(roundidx, questionsGatewayUrl, questionsEncrypted)
        this.pubquiz.rounds[roundidx].questionsEncrypted = questionsEncrypted
        this.pubquiz.rounds[roundidx].questionsDecrypted = JSON.parse( this.decrypt(questionsEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordQuestions) )
        // console.log(JSON.stringify(this.pubquiz,null,1))

        this.pubquiz.rounds[roundidx].playerAnswer = []
        for (let n = 0;n < this.pubquiz.rounds[this.round].questionsDecrypted.length;n++) {
          this.pubquiz.rounds[roundidx].playerAnswer.push('')
        }
      })
      .catch(err => console.error(err))

      const answersGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].answers
      // console.log(roundidx, questionsGatewayUrl)
      fetch(answersGatewayUrl)
      .then(res => res.text())
      .then(answersEncrypted => {
          // console.log(roundidx, answersGatewayUrl, answersEncrypted)
          this.pubquiz.rounds[roundidx].answersEncrypted = answersEncrypted
          this.pubquiz.rounds[roundidx].answersDecrypted = JSON.parse( this.decrypt(answersEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordAnswers) )
          // console.log(JSON.stringify(this.pubquiz,null,1))
        })
        .catch(err => console.error(err))
  
    } // end of getRound(roundidx)

  ionViewDidLoad() {

      // this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

      // console.log(this.web3);

      // this.dataService.load().then((data) => {
      //     data.map((question,index) => {
      //           question.id=index;
      //           question.choices = [ "AGAIN", "TOMORROW", "LATER" ];
      //           question.status = "NEW"
      //         });
      //
      //     this.questions = data;
      // });
  }

  previousQuestion() {
    this.question = Math.max(0, this.question-1) 
    // console.log('previousQuestion', this.question)
  }

  nextQuestion() {
    this.question = Math.min(this.pubquiz.rounds[this.round].questions.length-1, this.question+1)
    // console.log('nextQuestion', this.question)
  }

  submitRound() {
    // alert(JSON.stringify(this.answer, null, 4))

    // TODO: submit this player's answers to the smart contract

    this.navCtrl.push(RatePage, {
      pubquiz: this.pubquiz, 
      round: this.round, 
      // playerAnswer: this.playerAnswer,
      playerUserId: this.playerUserId,
    });
  }

  logObject(obj) {
    console.log(JSON.stringify(obj, null, 1))
  }

  // web3Version() {
  //   return this.web3&&this.web3.version||'unknown';
  // }
}
