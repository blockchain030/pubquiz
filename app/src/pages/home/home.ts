import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

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
  answer: any[];

  constructor(public navCtrl: NavController) {
    this.pubquiz = gPubquiz
    this.round = 0
    this.question = 0

    this.answer = []
    for (let n = 0;n < this.pubquiz.rounds[this.round].questions.length;n++) {
      this.answer.push('')
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
    alert(JSON.stringify(this.answer, null, 4))
  }

  // web3Version() {
  //   return this.web3&&this.web3.version||'unknown';
  // }
}
