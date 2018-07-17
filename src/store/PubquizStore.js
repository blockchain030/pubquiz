import { types } from "mobx-state-tree"
import { values } from "mobx";
import { generateKeys } from '../smartcontractInterface'

// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


const Team = types.model({
    name: localStorage.name ? localStorage.name : 'Team Name',
    seed: localStorage.seed ? localStorage.seed : '',
    private: localStorage.private ? localStorage.private : '',
    address: localStorage.address ? localStorage.address : '',
    registered: false,
}).actions(self => {

    function setName(name) {
        self.name =
        localStorage.name = name
    }

    function setSeed(seed) {
        self.seed =
        localStorage.seed = seed

        var keyinfo = generateKeys(seed, 0)

        self.private =
        localStorage.private = keyinfo.private
        self.address =
        localStorage.address = keyinfo.address

        console.log('private:', self.private, 'address:', self.address)
    }

    function setRegistered(registered) {
        self.registered = registered
    }

    function signOut() {
      localStorage.removeItem('name')
      localStorage.removeItem('seed')
      localStorage.removeItem('private')
      localStorage.removeItem('address')
      self.name = ''
      self.seed = ''
      self.private = ''
      self.address = ''
      self.registered= false
    }

    return {setName, setSeed, setRegistered, signOut}
})


const GradedAnswer = types.model({
    teamName: '',
    teamId: '',
    answer: '',
    grade: 0,
})


const Question = types.model({
    question: '',
    answer: '',
    myAnswer: '',
    gradedAnswers: types.optional(types.array(GradedAnswer), []),
}).views(self => ({

    get nAnswersToGrade() {
        return self.gradedAnswers.length
    },

})).actions(self => {

    function setMyAnswer(myAnswer) {
        self.myAnswer = myAnswer
    }

    function pushGradedAnswer(gradedAnswer) {
        // console.log('Question.pushGradedAnswer', gradedAnswer)
        self.gradedAnswers.push(gradedAnswer)
    }

    function setGrade(teamIndex, grade) {
        // console.log('Question.setGrade', teamIndex, grade)
        self.gradedAnswers[teamIndex].grade = grade
    }

    return {setMyAnswer, pushGradedAnswer, setGrade}
})


const Round = types.model({
    name: '',
    questions: types.optional(types.array(Question), []),
    answersPassword: '',
}).views(self => ({

    get myAnswers() {
        return values(self.questions).map(q => q.myAnswer)
    },

})).actions(self => {

    function pushQuestion(question) {
        // console.log('Round.pushQuestion', question)
        self.questions.push(question)
    }

    function setAnswers(answers) {
        // console.log('setAnswers', answers)
        if (self.questions.length !== answers.length) {
            console.error('Number of questions (' + self.questions.length + ') !== number of answers (' + answers.length + ')')
            return
        }

        for (const i in answers) {
            // console.log(answers[i])
            self.questions[i].answer = answers[i]
        }
    }

    function setAnswersPassword(answersPassword) {
        self.answersPassword = answersPassword
    }

    return {pushQuestion, setAnswers, setAnswersPassword}
})


const Quiz = types.model({
    contractaddress: '',
    contractinfohash: '',
    name: '',
    roundIndex: 0,
    questionIndex: 0,
    rounds: types.optional(types.array(Round), []),
}).views(self => ({
    get currentRound() {
        return self.rounds[self.roundIndex]
    },

    get currentQuestion() { // of currentRound
        return self.currentRound.questions[self.questionIndex]
    },

    get nRounds() {
        return self.rounds.length
    },

    get nQuestions() { // of currentRound
        return self.currentRound.questions.length
    },
})).actions(self => {

    function reset(name) {
        self.contractaddress = ''
        self.contractinfohash = ''
        self.name = name
        self.roundIndex = 0
        self.questionIndex = 0
        self.rounds = []
    }

    function pushRound(round) {
        self.rounds.push(round)
    }

    function setRoundIndex(roundIndex, questionIndex=0) {
        self.roundIndex = roundIndex
        self.questionIndex = questionIndex
    }

    function setQuestionIndex(questionIndex) {
        self.questionIndex = questionIndex
    }

    function setContractInfo(address, infohash) {
        console.log('setContractInfo:@' + address + '@/@' + infohash + '@')
        self.contractaddress = address
        self.contractinfohash = infohash
    }

    return {reset, pushRound, setRoundIndex, setQuestionIndex, setContractInfo}
})


const TeamScoreInfo = types.model({
    teamName: '',
    teamId: '',
    points: 0,
})

const TeamScores = types.model({
    afterRound: 0,
    teamScoreInfo: types.optional(types.array(TeamScoreInfo), []),
}).actions(self => {

    function setAfterRound(afterRound) {
        self.afterRound = afterRound
    }

    function setTeamScoreInfo(teamScoreInfo) {
        self.teamScoreInfo = teamScoreInfo
    }

    return {setAfterRound, setTeamScoreInfo}
})


// const Snackbar = types.model({
//     text: '',
//     type: types.optional(types.enumeration('SnackbarInfo', ['log','info','warning','error']), 'log')
// }).actions(self => {

//     function show(text, type='log') {
//         self.text = text
//         self.type = type
//     }

//     function hide() {
//         show('')
//     }

//     return {show, hide}
// })


const RootStore = types.model({
    page: 'register',
    nextPage: 'register',
    modal: '',
    nModalsShown: 0,
    tasks: types.optional(types.array(types.string), []), // tasks are performed by the Waiting modal
    // snackbar: types.optional(Snackbar, {}),
    team: types.optional(Team, {}),
    quiz: types.optional(Quiz, {}),
    teamScores: types.optional(TeamScores, {}),
}).actions(self => {

    function setPage(page) {
        self.page = page
    }

    function setNextPage(nextPage) {
        self.nextPage = nextPage
    }

    function setModal(modal) {
        self.modal = modal
        self.nextPage = self.page
        self.nModalsShown++
    }

    function hideModal() {
        self.modal = '' // '' means no modal
        self.waitingModalText = ''
    }

    function pushTask(task) { // FIFO buffer appends to the end
        self.tasks.push(task)
    }

    function shiftTask() { // FIFO buffer removes to the beginning
        self.tasks.shift()
    }

    function setSeed(seed) {
        self.seed = seed
    }

    return {setPage, setNextPage, setModal, hideModal, pushTask, shiftTask, setSeed}
})


//
const store = RootStore.create()

// export { Question, Round, Quiz, RootStore }
export default store
