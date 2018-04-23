import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// ES6 import
import jsQR from "jsqr";
 


/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }

// CommonJS require
const jsQR = require("jsqr");
  const code = jsQR(imageData, width, height);
 
	if (code) {
  		console.log("Found QR code", code);
	}

}
