import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Data } from '../../providers/data';

let gPubquiz = {
  "rounds": [
    { "title": "ronde 1 - algemeen",
      "questions": [
      {
        "number": "1",
        "question": "vraag 1",
        "answer": "antwoord 1",
        "answers": [{userId: 100, approve: true, text: "Antwoord player 1"}, {userId: 101, approve: true, text: "Antwoord player 2"}, {userId: 102, approve: true, text: "Antwoord player3"}, {userId: 103, approve: true, text: "Antwoord player 4"}],
      },
      {
        "number": "2",
        "question": "vraag 2",
        "answer": "antwoord 2",
        "answers": [{userId: 100, approve: true, text: "Antwoord player 1"}, {userId: 101, approve: true, text: "Antwoord player 2"}, {userId: 102, approve: true, text: "Antwoord player3"}, {userId: 103, approve: true, text: "Antwoord player 4"}],
      }
    ]},
    { "title": "ronde 2 - ethereum",
      "questions": [
      {
        "number": "1",
        "question": "vraag 1",
        "answer": "antwoord 1",
        "answers": [{userId: 100, approve: true, text: "Antwoord player 1"}, {userId: 101, approve: true, text: "Antwoord player 2"}, {userId: 102, approve: true, text: "Antwoord player3"}, {userId: 103, approve: true, text: "Antwoord player 4"}],
      },
      {
        "number": "2",
        "question": "vraag 2",
        "answer": "antwoord 2",
        "answers": [{userId: 100, approve: true, text: "Antwoord player 1"}, {userId: 101, approve: true, text: "Antwoord player 2"}, {userId: 102, approve: true, text: "Antwoord player3"}, {userId: 103, approve: true, text: "Antwoord player 4"}],
      }
    ]},
  ]
}
// console.log(gPubquiz)

// import Web3 from 'web3';

@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html'
})
export class RatePage {

  // web3: any;
  
  pubquiz: any;
  round: any;     // index
  question: any;  // index
  answer: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pubquiz = gPubquiz
    this.round = navParams.get('round')
    this.question = 0
    this.answer = navParams.get('answer')
  }

  ionViewDidLoad() {
  }

  disapprove(userId) {
    // console.log('disapprove', userId)
    for (let answer of this.pubquiz.rounds[this.round].questions[this.question].answers) {
      if (answer.userId === userId) {
        answer.approve = false;
      }
      // console.log(answer)
    }
  }
  
  approve(userId) {
    // console.log('approve', userId)
    for (let answer of this.pubquiz.rounds[this.round].questions[this.question].answers) {
      if (answer.userId === userId) {
        answer.approve = true;
      }
      // console.log(answer)
    }
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
    this.navCtrl.push(RatePage);
  }
}
