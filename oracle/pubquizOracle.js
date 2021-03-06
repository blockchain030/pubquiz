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
}

// create a new quiz, store data on ipfs, setup smart contract, return smart contract address
exports.endQuiz = function(req, res) {
  const fs = require('fs');

  var currentfilename = './datasets/gameinfo.json';
  if(fs.existsSync(currentfilename)) {
    fs.unlinkSync(currentfilename);
  }

  var result = !fs.existsSync(currentfilename);
  res.json({ result: result});
};

// return hash of the current quiz smart contract address
exports.getAddress = function(req, res) {
  var result;
  try {
    const fs = require('fs');
    var currentfilename = './datasets/gameinfo.json';
    if(fs.existsSync(currentfilename)) {
      var json = JSON.parse(fs.readFileSync(currentfilename));
      result = { result:true, address: json.address, abiaddress: json.abiaddress };
    } else {
      console.log('pubquizOracle.getAddress - no active pubquiz');
      result = { result:true, address: '', abiaddress: '', message: 'no active quiz' };
    }
  } catch(ex) {
    // file does not exist
    console.log('pubquizOracle.getAddress error: quiz contract address unknown (probably not deployed yet) []' + ex.message + "]");
    result = { result:false, address: '', abiaddress: '', message: 'error' + ex.message };
  }

  res.json(result);
};

// set hash of the current quiz smart contract address
exports.setAddress = function(req, res) {
  try {
    const fs = require('fs');

    var address = req.params.contractaddress;
    var hash = req.params.abiaddress;
    // add some kind of validation here?

    var result = { address: address, abiaddress: hash };

    var ts = new Date();
    var currentfilename = './datasets/gameinfo.json';
    fs.writeFileSync(currentfilename, JSON.stringify(result,0,2));

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
exports.ipfsStatus = function(req,
  res) {
  var result = { result:true, ipfsrunning: true };
  res.json(result);
};
