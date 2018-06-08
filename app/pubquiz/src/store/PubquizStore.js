import { types } from "mobx-state-tree"
// import { values } from "mobx";


// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


const Question = types.model({
    question: "",
    answer: "",
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
}).actions(self => {

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

    return {reset, addRound}
})


const RootStore = types.model({
    page: "home",
    seed: localStorage.seed ? localStorage.seed : "",
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

    return {setPage, setSeed}
})


//
const store = RootStore.create()

// export { Question, Round, Quiz, RootStore }
export default store
