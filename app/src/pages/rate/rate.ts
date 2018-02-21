import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { Data } from '../../providers/data';

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
  playerAnswer: any[];
  playerUserId: any;
  answers: any[][];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pubquiz = navParams.get('pubquiz')
    this.round = navParams.get('round')
    this.question = 0
    this.playerAnswer = navParams.get('playerAnswer')
    this.playerUserId = navParams.get('playerUserId')
    // console.log(this.playerUserId)

    this.answers = [ // TODO: get this from the smart contract
      [{userId: 100, approve: true, text: "Q1A1"}, {userId: 101, approve: true, text: "Q1A2"}, {userId: 102, approve: true, text: "Q1A3"}, {userId: 103, approve: true, text: "Q1A4"}, {userId: 104, approve: true, text: "Q1A5"}],
      [{userId: 100, approve: true, text: "Q2A1"}, {userId: 101, approve: true, text: "Q2A2"}, {userId: 102, approve: true, text: "Q2A3"}, {userId: 103, approve: true, text: "Q2A4"}, {userId: 104, approve: true, text: "Q2A5"}],
    ]
    // console.log(this.answers)
  }

  ionViewDidLoad() {
  }

  // setApproval(userId, value) {
  //   // console.log('setApproval', userId, value)
  //   for (let answer of this.answers[this.question]) {
  //     if (answer.userId === userId) {
  //       answer.approve = value;
  //     }
  //     // console.log(answer)
  //   }
  // }
  
  previousQuestion() {
    this.question = Math.max(0, this.question-1) 
    // console.log('previousQuestion', this.question)
  }

  nextQuestion() {
    this.question = Math.min(this.pubquiz.rounds[this.round].questions.length-1, this.question+1)
    // console.log('nextQuestion', this.question)
  }

  submitRound() {
    // TODO: submit answers to smart contract
    alert(JSON.stringify(this.answers, null, 4))
  }
}
