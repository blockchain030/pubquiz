// create a new quiz, store data on ipfs, setup smart contract, return smart contract address
exports.createQuiz = function(req, res) {
  const fs = require('fs');
  const makePubQuiz = require('./makepubquiz.js');

  var quiz = new makePubQuiz();
  var questionlist = quiz.makeQuestionlist(5,3);
  var quizinfo = quiz.makePubquiz(questionlist);

  const quizfolder = "./quizinfo"
  if(!fs.existsSync(quizfolder)) {
    fs.mkdirSync(quizfolder)
  }

  require("datejs")
  var ts = new Date();
  var filename = './quizinfo/' + ts.toString("yyyyMMdd_hhmmss") + '-quiz.json';
  fs.writeFileSync(filename, JSON.stringify(quizinfo,0,2));

  var address = { result:true, address: "", info: quizinfo };
  res.json(address);
};

// return hash of the current quiz smart contract address
exports.getAddress = function(req, res) {
  var address = { result:true, address: "" };
  res.json(address);
};

// close answer round, close check round etc.
exports.nextStep = function(req, res) {
  var result = { result:true };
  res.json(result);
};

// check if ipfs is running locally
exports.ipfsStatus = function(req, res) {
  var result = { result:true, ipfsrunning: true };
  res.json(result);
};
