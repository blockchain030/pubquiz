import { decrypt } from '../ipfsInterface'
import { asText, asJSON } from '../ipfsInterface'

const secretQuizinfo = require('./20180320-quiz.json'); // XXX this is a copy!

const getAnswers = async (store) => {
    const { pubquiz } = global

    console.log('getAnswers: TODO: get answers from smartcontract')

    const currentPlayerInfoHash = await pubquiz.currentPlayerInfoHash()
    const currentPlayerInfo = await asJSON(currentPlayerInfoHash)
    const { rounds } = currentPlayerInfo
    // console.log('getAnswers: rounds', rounds)
    // console.log('getAnswers: currentPlayerInfo', currentPlayerInfo)

    const currentRoundForAnswers = (await pubquiz.getCurrentRoundForAnswers()).toNumber()
    // console.log('getAnswers: currentRoundForAnswers', currentRoundForAnswers)

    const round = rounds[currentRoundForAnswers]
    // console.log('getAnswers: round', round)

    const password = await pubquiz.getPasswordForAnswersInRound(currentRoundForAnswers)
    if (!password) {
        console.log('getAnswers: no password for answers in round', currentRoundForAnswers)
        return
    }

    const answersEncrypted = await asText(round.answers)
    console.log('getAnswers: answersEncrypted', answersEncrypted)

    const answers = JSON.parse( decrypt(answersEncrypted, password) )
    console.log('getAnswers: answers', answers)

    // the old code...
    const round_   = secretQuizinfo.oracleinfo.rounds[store.quiz.roundIndex].info
    const answers_ = round_.questions.map(q => q.answer)
    store.quiz.currentRound.setAnswers(answers_)
}

export default getAnswers
