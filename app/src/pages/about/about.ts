import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RatePage } from '../rate/rate';

let pubquiz = {
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


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

    // web3: any;
  
  pubquiz: any;
  round: any;     // index
  question: any;  // index
  playerAnswer: any[];
  playerUserId = 101;

  constructor(public navCtrl: NavController) {

  }

}
