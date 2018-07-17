var doApiCall = async (apicall) => {
  try {
    const rp = require('request-promise-native');

    var url = "https://pubquiz.fun/api" + apicall;

    // use local node API during testing
    if(true||process.env.NODE_ENV==='development') {   // &&false -> use server during development
      url = "http://localhost:3001" + apicall;
    }

    return  await rp({uri: url,  json: true });
  } catch(ex) {
    console.log('TestConstract.doApiCall: error ' + ex.message)
    return false;
  }
}

var Pubquiz = artifacts.require("./Pubquiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Pubquiz)
      .then(() => {
        try {
          // store ABI code in IPSF
          const fs = require('fs');
          const ipfsAddPlain = require('../../../oracle/ipfsfunctions').ipfsAddPlain;

          var abiaddress = ipfsAddPlain(JSON.stringify(Pubquiz,0,2));
          if(abiaddress===false) {
            console.log('truffle deploy error: unable to add ABI info to IPFS. Is the IPFS daemon running??')
            return false;
          }
          console.log("Use API to store contract address/infohash : " + Pubquiz.address + "/" + abiaddress);

          var apicall = "/quiz/setaddress/"+Pubquiz.address+'/'+abiaddress+'/';
          doApiCall(apicall, (err, res, body) => {
              if (err) {
                console.log(apicall + ' failed: ' + err);
                return false;
              }

              return true;
          })
        } catch(ex)  {
          console.log('contract info not stored (' + ex + ')')
        }
      });
};
