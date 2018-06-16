import { types } from "mobx-state-tree"
import { values } from "mobx";


// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


const Team = types.model({
    name: localStorage.name ? localStorage.name : 'Team Name',
    seed: localStorage.seed ? localStorage.seed : '',
    registered: false,
}).actions(self => {

    function setName(name) {
        self.name =
        localStorage.name = name
    }

    function setSeed(seed) {
        self.seed =
        localStorage.seed = seed
    }

    function setRegistered(registered) {
        self.registered = registered
    }

    return {setName, setSeed, setRegistered}
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

    return {pushQuestion, setAnswers}
})


const Quiz = types.model({
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
        self.name = name
        self.roundIndex = 0
        self.questionIndex = 0
        self.rounds = []
    }

    function pushRound(name, questions) {
        // console.log('Quiz.pushRound', name, questions)
        self.rounds.push(Round.create({name, questions}))
        // for (const question of questions) {
        //     self.rounds[roundIndex].pushQuestion(question)
        // }
    }

    function setRoundIndex(roundIndex, questionIndex=0) {
        self.roundIndex = roundIndex
        self.questionIndex = questionIndex
    }

    function setQuestionIndex(questionIndex) {
        self.questionIndex = questionIndex
    }

    return {reset, pushRound, setRoundIndex, setQuestionIndex}
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

    return {}
})


const Snackbar = types.model({
    text: '',
    type: 'info',
}).actions(self => {

    function show(text, type='info') {
        self.text = text
        self.type = type
    }

    function hide() {
        show('')
    }

    return {show, hide}
})


const RootStore = types.model({
    page: 'register',
    nextPage: 'register',
    modal: '',
    waitingModalText: '',
    snackbar: types.optional(Snackbar, {}),
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
    }

    function hideModal() {
        self.modal = '' // '' means no modal
        self.waitingModalText = ''
    }

    function appendWaitingModalText(waitingModalText) {
        self.waitingModalText += waitingModalText + '\n'
    }

    function setSeed(seed) {
        self.seed = seed
    }

    return {setPage, setNextPage, setModal, hideModal, appendWaitingModalText, setSeed}
})


//
const store = RootStore.create()

// export { Question, Round, Quiz, RootStore }
export default store
