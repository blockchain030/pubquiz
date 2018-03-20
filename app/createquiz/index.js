// class pubquiz creates all files on IPFS that are required to play a single pubquiz
// -> one file containing
//   -> hash for full game info (not stored on IPFS, proof of oracle thruth)
//
//   -> for each round
//     -> hash of encrypted questions for this round
//     -> hash of encrypted answers for this round
//

class PubQuiz {
  constructor() {
  }

  makePubquiz(questionlist) {
    const ipfsAddEncrypted = require('./ipfsfunctions').ipfsAddEncrypted;
    const ipfsAddPlain = require('./ipfsfunctions').ipfsAddPlain;
    const ipfsGetHashPlain = require('./ipfsfunctions').ipfsGetHashPlain;
    const randomstring = require("randomstring");

    var playerinfo = {
       oracleinfo: '',
       rounds: []
    };

    var oracleinfo = {
      rounds: []
    };

    for(var roundidx=0;roundidx<questionlist.rounds.length;roundidx++) {
      oracleinfo.rounds.push({
        passwordQuestions: randomstring.generate(8),
        passwordAnswers: randomstring.generate(8),
        info: questionlist.rounds[roundidx]
      });

      var round = questionlist.rounds[roundidx];

      var tmpQuestions = [];
      var tmpAnswers = [];
      for(var questionidx=0;questionidx<round.questions.length;questionidx++) {
        // console.log('* ' + round.questions[questionidx].question);
        tmpQuestions.push(round.questions[questionidx].question);
        tmpAnswers.push(round.questions[questionidx].answer);
      }

      var hashQuestions = ipfsAddEncrypted(JSON.stringify(tmpQuestions), oracleinfo.rounds[roundidx].passwordQuestions);
      var hashAnswers = ipfsAddEncrypted(JSON.stringify(tmpQuestions), oracleinfo.rounds[roundidx].passwordAnswers);

      playerinfo.rounds.push({'questions': hashQuestions, 'answers': hashAnswers});
    }

    playerinfo.oracleinfo = ipfsGetHashPlain(oracleinfo);

    var hashplayerinfo = ipfsAddPlain(JSON.stringify(playerinfo));

    questionlist.quizhash = hashplayerinfo;

    // console.log(hashplayerinfo);
    return {
      oracleinfo: oracleinfo,
      playerinfo: playerinfo,
      playerinfoHash: hashplayerinfo
    };
  }
}

// ophalen voorbeeldquiz
test = async () => {
  var fs = require('fs');
  var contents = fs.readFileSync('./datasets/20180319-questions.json').toString();

  var json = JSON.parse(contents);

  var quiz = new PubQuiz();
  var quizinfo = quiz.makePubquiz(json);

  console.log(JSON.stringify(quizinfo,0,2));

  fs.writeFileSync('./quizinfo/20180320-quiz.json', JSON.stringify(quizinfo,0,2));
}

test();
