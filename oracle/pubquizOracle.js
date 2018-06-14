// create a new quiz, store data on ipfs, setup smart contract, return smart contract address
exports.createQuiz = function(req, res) {
  const fs = require('fs');
  const makePubQuiz = require('./makepubquiz.js');

  var quiz = new makePubQuiz();
  // var questionlist = quiz.makeQuestionlist(5,3);
  var questionlist = quiz.makeQuestionlist(1,1);
  var quizinfo = quiz.makePubquiz(questionlist);
  if(quizinfo===false) {
    var result = { result:false, address: "", info: {} };
    res.json(result);
    return;
  }

  const quizfolder = "./quizinfo"
  if(!fs.existsSync(quizfolder)) {
    fs.mkdirSync(quizfolder)
  }

  require("datejs")
  var ts = new Date();
  var filename = './quizinfo/' + ts.toString("yyyyMMdd_hhmmss") + '-quiz.json';
  fs.writeFileSync(filename, JSON.stringify(quizinfo,0,2));

  var result = { result:true, address: "", info: quizinfo };
  res.json(result);
};

// return hash of the current quiz smart contract address
exports.getAddress = function(req, res) {
  var result = { result:true, address: "" };
  res.json(result);
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
