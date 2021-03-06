import { Component } from '@angular/core';
import jsQR from 'jsqr';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

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
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignInPage');
    this.initQRScanner();
  }

  initQRScanner = () => {
    var video = document.createElement("video");
    var canvasElement: any = document.getElementById("canvas");
    var canvas: any = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    // var outputContainer = document.getElementById("output");
    // var outputMessage = document.getElementById("outputMessage");
    // var outputData = document.getElementById("outputData");

    const drawLine = (begin, end, color) =>  {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    const tick = () => {
      loadingMessage.innerText = "⌛ Loading video..."
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code) { // qr code found
          const mnemonic12 = code.data.split(' ').length === 12
          const color = mnemonic12 ? 'green' : 'red'; // "#FF3B58"
          drawLine(code.location.topLeftCorner    , code.location.topRightCorner   , color);
          drawLine(code.location.topRightCorner   , code.location.bottomRightCorner, color);
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner , color);
          drawLine(code.location.bottomLeftCorner , code.location.topLeftCorner    , color);
          if (mnemonic12) {
            this.navParams.data.mnemonic = code.data;
          }
        } // else no qr code found
      } // else not enough video data (yet)
      requestAnimationFrame(tick);
    } // end of tick()
  } // end of initQRScanner()

  signIn() {
    this.viewCtrl.dismiss({mnemonic: this.navParams.data.mnemonic});
  }
}
