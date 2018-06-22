import delay from 'await-delay'


const submitMyAnswers = async (store) => {
    await delay(1000)

    console.log('myAnswers', store.quiz.currentRound.myAnswers)
}

export default submitMyAnswers
