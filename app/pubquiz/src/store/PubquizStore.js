import { types } from "mobx-state-tree"
// import { values } from "mobx";


// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


const Team = types.model({
    name: localStorage.name ? localStorage.name : "Team Name",
    seed: localStorage.seed ? localStorage.seed : "",
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
    

const Question = types.model({
    question: "",
    answer: "",
    myAnswer: "",
}).actions(self => {

    function setMyAnswer(myAnswer) {
        self.myAnswer = myAnswer
    }

    return {setMyAnswer}
})


const Round = types.model({
    name: "",
    questions: types.optional(types.map(Question), {}),
}).actions(self => {

    function addQuestion(id, question) {
        // console.log('Round.addQuestion', id, question)
        self.questions.set(id, Question.create(question))
    }

    return {addQuestion}
})


const Quiz = types.model({
    name: "",
    roundIndex: 0,
    questionIndex: 0,
    rounds: types.optional(types.map(Round), {}),
}).views(self => ({

    // get nRounds() { // Computed property
    //     return values(self.todos).filter(todo => !todo.done).length
    // },
    
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

    function setRoundIndex(roundIndex) {
        self.roundIndex = roundIndex
    }

    function setQuestionIndex(questionIndex) {
        self.questionIndex = questionIndex
    }

    return {reset, addRound, setRoundIndex, setQuestionIndex}
})


const RootStore = types.model({
    page: "home",
    activeTab: 0,
    team: types.optional(Team, {}),
    quiz: types.optional(Quiz, {}),
}).views(self => ({

    // get pendingCount() { // Computed property
    //     return values(self.todos).filter(todo => !todo.done).length
    // },

    // get completedCount() { // Computed property
    //     return values(self.todos).filter(todo => todo.done).length
    // },

    // getTodosWhereDoneIs(done) { // Model view
    //     return values(self.todos).filter(todo => todo.done === done)
    // },

})).actions(self => {
    function setPage(page) {
        self.page = page
    }

    function setSeed(seed) {
        self.seed = seed
    }

    function setActiveTab(activeTab) {
        self.activeTab = activeTab
    }

    return {setPage, setSeed, setActiveTab}
})


//
const store = RootStore.create()

// export { Question, Round, Quiz, RootStore }
export default store
