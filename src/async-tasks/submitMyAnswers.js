import { generatePassword, encrypt } from '../smartcontractInterface'


const submitMyAnswers = async (store) => {
    const myAnswers = store.quiz.currentRound.myAnswers.toString()
    console.log('myAnswers', myAnswers)

    const answersPassword = generatePassword()
    // console.log('answersPassword', answersPassword)
    store.quiz.currentRound.setAnswersPassword(answersPassword)

    const myAnswersEncrypted = encrypt(myAnswers, answersPassword)
    console.log('myAnswersEncrypted', myAnswersEncrypted)

    // console.log('->', decrypt('4fad62a98573', password))
}

export default submitMyAnswers
