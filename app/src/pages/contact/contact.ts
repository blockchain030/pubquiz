import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const IPFS = require('ipfs');
// console.log(IPFS);

const node = new IPFS();
// console.log(node);

(cb) => node.files.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World')
  }, (err, filesAdded) => {
    if (err) { return cb(err); }
  
    // Once the file is added, we get back an object containing the path, the
    // multihash and the sie of the file
    console.log('\nAdded file:', filesAdded[0].path, filesAdded[0].hash);
    fileMultihash = filesAdded[0].hash;
    cb();
  });



@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {
    console.log('testt')
  }

}
