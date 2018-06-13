const makePubQuiz = require('./makepubquiz.js');

// ophalen voorbeeldquiz
test = async () => {
  const fs = require('fs');
  const ipfsGetPlain = require('./ipfsfunctions').ipfsGetPlain;
  const ipfsGetEncrypted = require('./ipfsfunctions').ipfsGetEncrypted;
  const decrypt = require('./ipfsfunctions').decrypt;

  // var contents = fs.readFileSync('./datasets/20180319-questions.json').toString();
  // var json = JSON.parse(contents);

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

  // retrieve files from IPFS
  var playerinfoJSON = await ipfsGetPlain(quizinfo.playerinfoHash);
  var playerinfo = JSON.parse(playerinfoJSON);
  for(var roundidx=0; roundidx<playerinfo.rounds.length; roundidx++) {
      // console.log('+++ ROUND ' + roundidx + ' +++');
      var hashquestions = playerinfo.rounds[roundidx].questions;
      var hashanswers = playerinfo.rounds[roundidx].answers;

      var questionsEncrypted = ipfsGetPlain(hashquestions);
      var answersEncrypted = ipfsGetPlain(hashanswers);

      var questionsPlain = decrypt(questionsEncrypted, quizinfo.oracleinfo.rounds[roundidx].passwordQuestions)
      var answersPlain = decrypt(answersEncrypted, quizinfo.oracleinfo.rounds[roundidx].passwordAnswers)

      // console.log('questions:\n',questionsPlain);
      // console.log('answers:\n', answersPlain);
    }
}

test();
