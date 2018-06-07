import { types /*, getSnapshot*/ } from "mobx-state-tree"
// import { values } from "mobx";


// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


// const User = types.model({
//     name: ""
// })


// const Todo = types.model({
//     name: "",
//     done: false
// }).actions(self => {
//     function setName(newName) {
//         self.name = newName
//     }

//     function toggle() {
//         self.done = !self.done
//     }

//     return {setName, toggle}
// })


const RootStore = types.model({
    page: "home",
    seed: localStorage.seed ? localStorage.seed : "",
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
