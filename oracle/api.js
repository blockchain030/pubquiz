const express = require('express');
const app = express();
const port = 3001; // process.env.PORT || 3030;

const fs = require('fs');
const http = require('http');
const https = require('https');

// Certificate
var privateKey="";
var certificate=""
var ca=""

try {
  privateKey = fs.readFileSync('/etc/letsencrypt/live/pubquiz.fun/privkey.pem', 'utf8');
  certificate = fs.readFileSync('/etc/letsencrypt/live/pubquiz.fun/cert.pem', 'utf8');
  ca = fs.readFileSync('/etc/letsencrypt/live/pubquiz.fun/chain.pem', 'utf8');
} catch(ex) {
  console.log("HTTPS disabled: no certificate files found")
}

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

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

  // end quiz, oracle will return empty contract address after this
  app.route('/quiz/end')
    .get(pubquizOracle.endQuiz)

  app.route('/quiz/uploaddemo')
    .get(pubquizOracle.uploadDemoQuiz)

  // store hash of the current quiz smart contract address
  app.route('/quiz/setaddress/:contractaddress/:abiaddress')
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

  if(credentials.key!="") {
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(3002, () => {
    	console.log('HTTPS Server running on port 3002');
    });
  }
} catch(ex) {
  console.log("api.js - fatal error", ex);
}
