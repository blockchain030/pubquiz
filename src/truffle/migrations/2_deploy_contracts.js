var Pubquiz = artifacts.require("./Pubquiz.sol");

module.exports = function(deployer) {
  deployer.deploy(Pubquiz)
      .then(() => {
        const doApiCall = require('../../apitools.js').doApiCall;

        console.log("Use API to store contract address : " + Pubquiz.address);

        var apicall = "/quiz/setaddress/"+Pubquiz.address;
        doApiCall(apicall, (err, res, body) => {
          if (err) {
            console.log(apicall + ' failed: ' + err);
            return false;
          }

          console.log(body)

          console.log(JSON.stringify(body,0,2));

          return true;
      })
    });
};
