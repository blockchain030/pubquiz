const express = require('express');
const app = express();
const port = 3001; // process.env.PORT || 3030;

const bodyParser = require('body-parser');

try {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var pubquizOracle = require('./pubquizOracle');

  // create a new quiz, store data on ipfs, setup smart contract, return smart contract address
  app.route('/quiz/create')
    .get(pubquizOracle.createQuiz)

  // create a new quiz, store data on ipfs, setup smart contract, return smart contract address
  app.route('/quiz/uploaddemo')
    .get(pubquizOracle.uploadDemoQuiz)

  // store hash of the current quiz smart contract address
  app.route('/quiz/setaddress/:contractaddress')
    .get(pubquizOracle.setAddress)

  // return hash of the current quiz smart contract address
  app.route('/quiz/getaddress')
    .get(pubquizOracle.getAddress)

  // close answer round, close check round etc.
  app.route('/quiz/nextstep')
    .get(pubquizOracle.nextStep)

    // app.route('/ipfs/getstatus')
    //   .get(pubquizOracle.ipfsstatus)

  require("datejs")
  const ts = new Date();
  console.log(ts.toString("yyyy/MM/dd hh:mm:ss") + ' pubquiz oracle API server started on: ' + port);

  app.listen(port);
} catch(ex) {
  console.log("api.js - fatal error" + ex.message);
}
