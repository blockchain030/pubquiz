exports.uploadDemoQuiz = function(req, res) {
  try {

    const fs = require('fs');
    const makePubQuiz = require('./makepubquiz.js');

    var quiz = new makePubQuiz();
    // var questionlist = quiz.makeQuestionlist(5,3);
    // var questionlist = quiz.makeQuestionlist(1,1);
    var questionsname = "./datasets/demo-questions.json";
    var questionlist = JSON.parse(fs.readFileSync(questionsname));

    console.log(questionlist);

    var quizinfo = quiz.makePubquiz(questionlist);
    if(quizinfo===false) {
      var result = { result:false, address: "", info: {} };
      res.json(result);
      return;
    }

    const quizfolder = "./datasets"
    if(!fs.existsSync(quizfolder)) {
      fs.mkdirSync(quizfolder)
    }

    require("datejs")
    var ts = new Date();
    var filename = './datasets/' + ts.toString("yyyyMMdd_hhmmss") + '-quiz.json';
    fs.writeFileSync(filename, JSON.stringify(quizinfo,0,2));

    var filename = './datasets/' + ts.toString("yyyyMMdd_hhmmss") + '-questions.json';
    fs.writeFileSync(filename, JSON.stringify(questionlist,0,2));

    var result = { result:true, address: "", info: quizinfo };
    res.json(result);
  } catch(ex) {
    res.json('error:' + ex.message);
  }
};

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

  const quizfolder = "./datasets"
  if(!fs.existsSync(quizfolder)) {
    fs.mkdirSync(quizfolder)
  }

  require("datejs")
  var ts = new Date();
  var filename = './datasets/' + ts.toString("yyyyMMdd_hhmmss") + '-quiz.json';
  fs.writeFileSync(filename, JSON.stringify(quizinfo,0,2));

  var result = { result:true, address: "", info: quizinfo };
  res.json(result);
};

// return hash of the current quiz smart contract address
exports.getAddress = function(req, res) {
  var result;
  try {
    const fs = require('fs');
    var currentfilename = './datasets/gameinfo.json';
    var json = JSON.parse(fs.readFileSync(currentfilename));
    result = { result:true, address: json.address };
  } catch(ex) {
    // file does not exist
    console.log('pubquizOracle.getAddress error: quiz contract address unknown (probably not deployed yet) []' + ex.message + "]");
    result = { result:false, address: '' };
  }

  res.json(result);
};

// set hash of the current quiz smart contract address
exports.setAddress = function(req, res) {
  try {
    const fs = require('fs');

    var address = req.params.contractaddress;
    // add some kind of validation here?

    var gameinfo = { address: req.params.contractaddress}

    var ts = new Date();
    // // write twice: one for logging, one for current value
    // var archivefilename = './datasets/' + ts.toString("yyyyMMdd_hhmmss") + '-gameinfo.json';
    var currentfilename = './datasets/gameinfo.json';
    // fs.writeFileSync(archivefilename, JSON.stringify(gameinfo,0,2));
    fs.writeFileSync(currentfilename, JSON.stringify(gameinfo,0,2));

    var result = { result:true, address: address };
    res.json(result);
  } catch(ex) {
    var result = { result:false, error: ex.message };
    res.json(result);
  }
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
