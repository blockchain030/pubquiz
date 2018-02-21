import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { Data } from '../../providers/data';
import { RatePage } from '../rate/rate';

const pubquizRef = 'QmXZCKkuabHYARSvGMHXkkB2rqWt1QG1YyLTc1qg5D8xEe'
// console.log(pubquizRef)
const pubquizGatewayUrl = 'https://gateway.ipfs.io/ipfs/' + pubquizRef
// console.log(pubquizGatewayUrl)

fetch(pubquizGatewayUrl)
  .then(res => res.json())
  .then(json => {
    console.log(json)
  })
  .catch(err => console.error(err));


// import IPFS from 'ipfs'
// const ipfs = new IPFS({ repo: String(Math.random() + Date.now()) })


// ipfs.once('start', (v) => {
//   console.log('start', v)
// })

// ipfs.once('error', (v) => {
//   console.log('error')
// })
  
// ipfs.once('ready', (v) => {
//   console.log('ready', v)

//   ipfs.id((err, info) => {
//     if (err) throw err
//     console.log('IPFS node ready with addres', info.id)
//   })

//   ipfs.files.cat(pubquizRef, (err, file) => {
//     if (err) throw err
//     console.log(file.toString('utf8'))
//   })
// })

// ipfs.once('ready', () => {
//   console.log('IPFS node is ready')

//   ipfs.files.cat(pubquizRef).then(file => {
//     console.log(file.toString('utf8'))
//   }).catch(ex => {
//     console.warn(JSON.stringify(ex))
//   })

//   // ipfs.files.cat('QmQzCQn4puG4qu8PVysxZmscmQ5vT1ZXpqo7f58Uh9QfyY', function (err, data) {
//   //   if (err) {
//   //     return console.error('Error - ipfs files cat', err, res)
//   //   }
//   //   console.log(data.toString())
//   // })
// })


// console.log(pubquizRef)
// ipfs.files.cat(pubquizRef).then(file => {
//   console.log(file.toString('utf8'))
// }).catch(ex => {
//   console.warn(JSON.stringify(ex))
// })


// ipfs.files.cat(pubquizRef, function (err, file) {
//   if (err) {
//     throw err
//   }
//   console.log(file.toString('utf8'))
// })


// let gPubquiz2 = require('../../assets/datasets/20180219-questions.json')
// console.log(gPubquiz2)

let gPubquiz = {
  "rounds": [
    { "title": "ronde 1 - algemeen",
      "questions": [
      {
        "number": "1",
        "question": "vraag 1",
        "answer": "antwoord 1"
      },
      {
        "number": "2",
        "question": "vraag 2",
        "answer": "antwoord 2"
      }
    ]},
    { "title": "ronde 2 - ethereum",
      "questions": [
      {
        "number": "1",
        "question": "vraag 1",
        "answer": "antwoord 1"
      },
      {
        "number": "2",
        "question": "vraag 2",
        "answer": "antwoord 2"
      }
    ]},
  ]
}
// console.log(gPubquiz)

// import Web3 from 'web3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // web3: any;
  
  pubquiz: any;
  round: any;     // index
  question: any;  // index
  playerAnswer: any[];

  constructor(public navCtrl: NavController) {
    this.pubquiz = gPubquiz
    this.round = 0
    this.question = 0

    this.playerAnswer = []
    for (let n = 0;n < this.pubquiz.rounds[this.round].questions.length;n++) {
      this.playerAnswer.push('')
    }
  }

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
    this.navCtrl.push(RatePage, {pubquiz: this.pubquiz, round: this.round, playerAnswer: this.playerAnswer});
  }

  // web3Version() {
  //   return this.web3&&this.web3.version||'unknown';
  // }
}
