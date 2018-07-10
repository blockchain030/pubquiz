import { generatePassword, encrypt } from '../smartcontractInterface'


const submitMyAnswers = async (store) => {
    const myAnswers = store.quiz.currentRound.myAnswers.toString()

    const answersPassword = generatePassword()
    store.quiz.currentRound.setAnswersPassword(answersPassword)

    const myAnswersEncrypted = encrypt(myAnswers, answersPassword)
    console.log('submitMyAnswers: myAnswersEncrypted', myAnswersEncrypted)

    console.log('submitMyAnswers: TODO: wait for signal from smartcontract (via oracle) that answering is finished')

    console.log('submitMyAnswers: TODO: submit answersPassword')
}

export default submitMyAnswers
