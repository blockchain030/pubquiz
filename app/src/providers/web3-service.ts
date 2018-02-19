import {Injectable} from '@angular/core';
import Web3 from 'web3';


declare var web3: any;

@Injectable()
export class Web3Service {

  web3: any;

  constructor() {

    // if (typeof web3 !== 'undefined') {
    //   console.log('using existing web3 provider')
    //   this.web3 = new web3(web3.currentProvider);
    // } else {
      console.log('creating localhost web3 provider')
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    //}
  }

  get() {
    return this.web3;
  }
}
