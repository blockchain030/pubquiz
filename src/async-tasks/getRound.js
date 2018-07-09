import crypto from 'crypto'


const IPFS_GATEWAY     = 'https://ipfs.io/ipfs/'

const getRound = async (store) => {
    const { pubquiz } = global

    store.quiz.reset('Blockchain quiz')

    const currentPlayerInfoHash = await pubquiz.currentPlayerInfoHash()
    const currentPlayerInfo = await (await fetch(IPFS_GATEWAY + currentPlayerInfoHash)).json()
    const { rounds } = currentPlayerInfo
    // console.log('rounds', rounds)
    // console.log('currentPlayerInfo', currentPlayerInfo)

    const currentRoundForQuestions = (await pubquiz.getCurrentRoundForQuestions()).toNumber()
    // console.log('currentRoundForQuestions', currentRoundForQuestions)

    const round = rounds[currentRoundForQuestions]
    // console.log('round', round)  

    const password = await pubquiz.getPasswordForQuestionsInRound(currentRoundForQuestions)
    if (!password) {
        console.log('no password for questions in round', currentRoundForQuestions)
        return
    }

    const questionsEncrypted = await (await fetch(IPFS_GATEWAY + round.questions)).text()

    const questions = JSON.parse( decrypt(questionsEncrypted, password) )
        .map(q => {return {question: q}})
    console.log(questions.length.toString(), 'questions in round', currentRoundForQuestions)

    store.quiz.pushRound({name:'round.title', questions})





    // const { rounds } = secretQuizinfo.oracleinfo

    // for (const roundIndex in rounds) {
    //     const round = rounds[roundIndex].info
    //     // console.log(roundIndex, round.questions)
    //     const questions = round.questions.map(q => {return {question: q.question}})
    //     store.quiz.pushRound({name:round.title, questions})
    // }





    // const pubquizGatewayUrl = IPFS_GATEWAY + secretQuizinfo.playerinfoHash
    // console.log(pubquizGatewayUrl)
    // fetch(pubquizGatewayUrl)
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log(JSON.stringify(json,null,1))
    //     this.pubquiz = json

    //     for(var roundidx=0; roundidx<this.pubquiz.rounds.length; roundidx++) {
    //       this.pubquiz.rounds[roundidx].title = 'Round ' + (roundidx + 1) // XXX this is currently missing from the puquiz json in ipfs
    //       this.getRound(roundidx)
    //     }
    //   })
    //   .catch(err => console.error(err));

    // this.round = 0
    // this.question = 0
}

const decrypt = (text, password, algorithm='aes-256-ctr') => {
    var decipher = crypto.createDecipher(algorithm,password);
    var dec = decipher.update(text,'hex','utf8');
    dec += decipher.final('utf8');
    return dec;
}

// const getRound = (roundidx) => {
//     const questionsGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].questions
//     // console.log(roundidx, questionsGatewayUrl)
//     fetch(questionsGatewayUrl)
//         .then(res => res.text())
//         .then(questionsEncrypted => {
//       // console.log(roundidx, questionsGatewayUrl, questionsEncrypted)
//       this.pubquiz.rounds[roundidx].questionsEncrypted = questionsEncrypted
//       this.pubquiz.rounds[roundidx].questionsDecrypted = JSON.parse( this.decrypt(questionsEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordQuestions) )
//       // console.log(JSON.stringify(this.pubquiz,null,1))

//       this.pubquiz.rounds[roundidx].playerAnswer = []
//       for (let n = 0;n < this.pubquiz.rounds[this.round].questionsDecrypted.length;n++) {
//           this.pubquiz.rounds[roundidx].playerAnswer.push('')
//       }
//     })
//     .catch(err => console.error(err))

//     const answersGatewayUrl = IPFS_GATEWAY + this.pubquiz.rounds[roundidx].answers
//     // console.log(roundidx, questionsGatewayUrl)
//     fetch(answersGatewayUrl)
//     .then(res => res.text())
//     .then(answersEncrypted => {
//         // console.log(roundidx, answersGatewayUrl, answersEncrypted)
//         this.pubquiz.rounds[roundidx].answersEncrypted = answersEncrypted
//         this.pubquiz.rounds[roundidx].answersDecrypted = JSON.parse( this.decrypt(answersEncrypted, secretQuizinfo.oracleinfo.rounds[roundidx].passwordAnswers) )
//         // console.log(JSON.stringify(this.pubquiz,null,1))
//     })
//     .catch(err => console.error(err))

// } // end of getRound(roundidx)

export default getRound
