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

import Web3 from 'web3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  web3: any;
  round: any = 0;
  question: any = 0;
  pubquiz: any = gPubquiz;

  constructor(public navCtrl: NavController) {
    console.log(this.round, this.question, JSON.stringify(this.pubquiz, null, 4))
  }

  ionViewDidLoad() {

      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

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

  web3Version() {
    return this.web3&&this.web3.version||'unknown';
  }
}
