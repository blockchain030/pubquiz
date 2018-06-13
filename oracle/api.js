const express = require('express');
const app = express();
const port = 3001; // process.env.PORT || 3030;

const bodyParser = require('body-parser');

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

// return hash of the current quiz smart contract address
app.route('/quiz/getaddress')
  .get(pubquizOracle.getAddress)

// close answer round, close check round etc.
app.route('/quiz/nextstep')
  .get(pubquizOracle.nextStep)

  // app.route('/ipfs/getstatus')
  //   .get(pubquizOracle.ipfsstatus)

app.listen(port);

console.log('pubquiz oracle API server started on: ' + port);
