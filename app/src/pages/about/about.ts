import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RatePage } from '../rate/rate';


import { ModalController } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  constructor(public modalCtrl: ModalController) { }
  
  

  openSignIn() {
    let myModal = this.modalCtrl.create(SignInPage, { mnemonic: localStorage.mnemonic });

    myModal.onDidDismiss(data => {
      if (!data) return;
      // console.log(data);
      localStorage.mnemonic = data.mnemonic;
    });

    myModal.present();
  }
}

// let pubquiz = {
//   "rounds": [
//     { "title": "ronde 1 - algemeen",
//       "questions": [
//       {
//         "number": "1",
//         "question": "vraag 1",
//         "answer": "antwoord 1"
//       },
//       {
//         "number": "2",
//         "question": "vraag 2",
//         "answer": "antwoord 2"
//       }
//     ]},
//     { "title": "ronde 2 - ethereum",
//       "questions": [
//       {
//         "number": "1",
//         "question": "vraag 1",
//         "answer": "antwoord 1"
//       },
//       {
//         "number": "2",
//         "question": "vraag 2",
//         "answer": "antwoord 2"
//       }
//     ]},
//   ]
// }

// import { ModalController } from 'ionic-angular';
// import { SignInPage } from '../sign-in/sign-in';

// export class MyPage {
//   constructor(public modalCtrl: ModalController) {
//   }

//   presentModal() {
//     let modal = this.modalCtrl.create(SignInPage);
//     modal.present();
//   }
// }



// const pubquizRef = '20180219-questions.json';
// const pubquizGatewayUrl = 'http://localhost:8100/assets/datasets/'+ pubquizRef;


// const dummyPubquiz = {
//   "rounds": [
//     { "title": "",
//       "questions": [
//         {
//           "number": "",
//           "question": "",
//           "answer": ""
//         }
//     ]}
//   ]
// }

// export class AboutPage {
//   constructor(public modalCtrl: ModalController) { }

//   openSignIn() {
//     let myModal = this.modalCtrl.create(SignInPage);
//     myModal.present();
//   }
// }


//     web3: any;

//   pubquiz: any;
//   round: any;     // index
//   question: any;  // index
//   playerAnswer: any[];
//   playerUserId = 101;

//   constructor(public navCtrl: NavController) {
//     this.pubquiz = dummyPubquiz  // note: dummy until we receive from the smart contract

//     fetch(pubquizGatewayUrl)
//       .then(res => res.json())
//       .then(json => this.pubquiz = json)
//       .catch(err => console.error(err));

//     this.round = 0
//     this.question = 0

//     this.playerAnswer = []
//     for (let n = 0;n < this.pubquiz.rounds[this.round].questions.length;n++) {
//       this.playerAnswer.push('')
//     }
//   }

//   previousQuestion() {
//     this.question = Math.max(0, this.question-1)
//     // console.log('previousQuestion', this.question)
//   }

//   nextQuestion() {
//     this.question = Math.min(this.pubquiz.rounds[this.round].questions.length-1, this.question+1)
//     // console.log('nextQuestion', this.question)
//   }

//   submitRound() {
//     // alert(JSON.stringify(this.answer, null, 4))

//     // TODO: submit this player's answers to the smart contract

//     this.navCtrl.push(RatePage, {
//       pubquiz: this.pubquiz,
//       round: this.round,
//       playerAnswer: this.playerAnswer,
//       playerUserId: this.playerUserId,
//     });
//   }

//   saveItem() {
//     console.log("saveitem");
//   }
