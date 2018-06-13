module.exports = class makePubQuiz {
  constructor() {
  }

  makeQuestionlist(nrounds, questionsperround) {
    var loremIpsum = require('lorem-ipsum');

    // create new dummy questions for each run
    // required to test with ipfs
    var questionlist = { rounds: [] };
    for(var roundidx=1;roundidx<nrounds;roundidx++) {
      var title = loremIpsum({count: 4, units: 'words', format: 'plain'});
      var round = { "title": title, "questions": [] }
      for(var questionidx=1;questionidx<questionsperround;questionidx++) {
        var question = loremIpsum({count: 6, units: 'words', format: 'plain'}) + '?';
        var answer = loremIpsum({count: 12, units: 'words', format: 'plain'});

        round.questions.push({
          "number": roundidx+'.'+questionidx,
          "question": question,
          "answer": answer
        })
      }
      questionlist.rounds.push(round);
    }

    console.log(JSON.stringify(questionlist,0,2));

    return questionlist;
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

      var hashQuestions = ipfsAddEncrypted(JSON.stringify(tmpQuestions,0,2), oracleinfo.rounds[roundidx].passwordQuestions);
      console.log('Questions for round ' + roundidx + ' url: http://ipfs.io/ipfs/' + hashQuestions);
      var hashAnswers = ipfsAddEncrypted(JSON.stringify(tmpAnswers,0,2), oracleinfo.rounds[roundidx].passwordAnswers);
      console.log('Answers for round ' + roundidx + ' url: http://ipfs.io/ipfs/' + hashAnswers);

      playerinfo.rounds.push({questions : hashQuestions, answers: hashAnswers });
    }

    playerinfo.oracleinfo = ipfsGetHashPlain(JSON.stringify(oracleinfo));

    var hashplayerinfo = ipfsAddPlain(JSON.stringify(playerinfo));
    console.log('Playerinfo data url: http://ipfs.io/ipfs/' + hashplayerinfo);

    return {
      oracleinfo: oracleinfo,
      playerinfo: playerinfo,
      playerinfoHash: hashplayerinfo
    };
  }
}
