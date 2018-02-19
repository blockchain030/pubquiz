import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../providers/data';

import Web3 from 'web3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  web3: any;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {

      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

      console.log(this.web3);

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
