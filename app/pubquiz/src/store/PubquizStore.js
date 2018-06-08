import { types /*, getSnapshot*/ } from "mobx-state-tree"
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
    function setName(newName) {
        self.name = newName
    }

    function addQuestion(id, question_answer) {
        self.questions.set(id, Question.create(question_answer))
    }

    return {setName, addQuestion}
})


const Quiz = types.model({
    name: "",
    roundIndex: 0,
    questionIndex: 0,
    rounds: types.optional(types.map(Round), {}),
}).actions(self => {
    function setName(newName) {
        self.name = newName
    }

    return {setName}
})


const RootStore = types.model({
    page: "home",
    seed: localStorage.seed ? localStorage.seed : "",
    quiz: types.optional(Quiz, {}),
    // users: types.map(User),
    // todos: types.optional(types.map(Todo), {})
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

    // function addTodo(id, name) {
    //     self.todos.set(id, Todo.create({ name }))
    // }

    function setPage(page) {
        self.page = page
    }

    function setSeed(seed) {
        self.seed = seed
    }

    return {/*addTodo,*/ setPage, setSeed}
})


//
// const john = User.create()
// console.log("John (User):", john.toJSON())

// const eat = Todo.create({ name: "eat", done: true })
// console.log("Eat (Todo):", eat.toJSON())

const store = RootStore.create({
    // users: { } // users is required here because it's not marked as optional
})
// console.log("store (RootStore):", store.toJSON())
// global.store = store
// store.addTodo(1, "Eat a cake")
// console.log(getSnapshot(store)) // or: console.log(store.toJSON())

export default store;
