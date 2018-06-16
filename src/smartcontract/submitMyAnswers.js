const submitMyAnswers = (store) => {
    store.appendWaitingModalText('submitMyAnswers')

    console.log('myAnswers', store.quiz.currentRound.myAnswers)
}

export default submitMyAnswers
