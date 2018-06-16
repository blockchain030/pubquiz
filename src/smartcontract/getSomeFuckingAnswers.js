const secretQuizinfo = require('./20180320-quiz.json'); // XXX this is a copy!


const getSomeFuckingAnswers = (store) => {
    store.appendWaitingModalText('getAnswers')

    // note: get answers for this round only of course

    const round = secretQuizinfo.oracleinfo.rounds[store.quiz.roundIndex].info
    const answers = round.questions.map(q => q.answer)
    store.quiz.currentRound.setAnswers(answers)
}

export default getSomeFuckingAnswers
