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
    // TODO: get the pubquiz from the smart contract

    this.pubquiz = { // TODO: get this from the smart contract (get the actual questions and answers from ipfs)
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
    // console.log(this.pubquiz)
    
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

    // TODO: submit this player's answers to the smart contract

    this.navCtrl.push(RatePage, {
      pubquiz: this.pubquiz, 
      round: this.round, 
      playerAnswer: this.playerAnswer,
    });
  }

  // web3Version() {
  //   return this.web3&&this.web3.version||'unknown';
  // }
}
