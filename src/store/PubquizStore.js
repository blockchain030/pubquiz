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
}).actions(self => {

    function setMyAnswer(myAnswer) {
        self.myAnswer = myAnswer
    }

    // function setGrade(id, grade) {
    //     console.log('Question.setGrade', id, grade)
    //     self.grade.set(id, grade)
    // }

    return {setMyAnswer/*, setGrade*/}
})


const Round = types.model({
    name: '',
    questions: types.optional(types.map(Question), {}),
}).views(self => ({
    
    get myAnswers() {
        return values(self.questions).map(q => q.myAnswer)
    },

})).actions(self => {

    function addQuestion(id, question) {
        // console.log('Round.addQuestion', id, question)
        self.questions.set(id, Question.create(question))
    }

    return {addQuestion}
})


const Quiz = types.model({
    name: '',
    roundIndex: 0,
    questionIndex: 0,
    rounds: types.optional(types.map(Round), {}),
}).views(self => ({

    get currentRound() {
        return self.rounds.get(String(self.roundIndex))
    },
    
    get currentQuestion() { // of currentRound
        return self.currentRound.questions.get(String(self.questionIndex))
    },
    
    get nRounds() {
        return self.rounds.size
    },

    get nQuestions() { // of currentRound
        return self.currentRound.questions.size
    },
    
})).actions(self => {

    function reset(name) {
        self.name = name
        self.roundIndex = 0
        self.questionIndex = 0
        self.rounds = {}
    }

    function addRound(id, name, questions) {
        // console.log('Quiz.addRound', id, name, questions)
        self.rounds.set(id, Round.create({name}))
        for (const questionIndex in questions) {
            self.rounds.get(id).addQuestion(questionIndex, questions[questionIndex])
        }
    }

    function setRoundIndex(roundIndex, questionIndex=0) {
        self.roundIndex = roundIndex
        self.questionIndex = questionIndex
    }

    function setQuestionIndex(questionIndex) {
        self.questionIndex = questionIndex
    }

    return {reset, addRound, setRoundIndex, setQuestionIndex}
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
    page: 'home',
    // activeTab: 0,
    snackbar: types.optional(Snackbar, {}),
    team: types.optional(Team, {}),
    quiz: types.optional(Quiz, {}),
}).actions(self => {
    function setPage(page) {
        self.page = page
    }

    function setSeed(seed) {
        self.seed = seed
    }

    // function setActiveTab(activeTab) {
    //     self.activeTab = activeTab
    // }

    return {setPage, setSeed /*, setActiveTab*/}
})


//
const store = RootStore.create()

// export { Question, Round, Quiz, RootStore }
export default store
