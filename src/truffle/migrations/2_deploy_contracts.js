var Pubquiz = artifacts.require("./Pubquiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Pubquiz)
      .then(() => {
        try {
          // store ABI code in IPSF
          const fs = require('fs');
          const ipfsAddPlain = require('../../../oracle/ipfsfunctions').ipfsAddPlain;

          console.log(process.cwd());

          var abiInfo = JSON.parse(fs.readFileSync('./build/contracts/Pubquiz.json'));

          var hashAbiInfo = ipfsAddPlain(JSON.stringify(abiInfo));
          if(hashAbiInfo===false) {
            console.log('truffle deploy error: unable to add ABI info to IPFS. Is the IPFS daemon running??')
            return false;
          }

          const doApiCall = require('../../apitools.js').doApiCall;

          console.log("Use API to store contract address : " + Pubquiz.address);
          console.log("abi" + JSON.stringify(Pubquiz.abi,0,2));

          var apicall = "/quiz/setaddress/"+Pubquiz.address+'/'+hashAbiInfo;
          doApiCall(apicall, (err, res, body) => {
              if (err) {
                console.log(apicall + ' failed: ' + err);
                return false;
              }

              console.log(body)

              console.log(JSON.stringify(body,0,2));

              return true;
          })
        } catch(ex)  {
          console.log('contract info not stored (' + ex.message() + ')')
        }
      });
};
