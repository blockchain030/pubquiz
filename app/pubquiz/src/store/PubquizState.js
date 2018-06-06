import { types, getSnapshot } from "mobx-state-tree"

// https://github.com/mobxjs/mobx-state-tree/blob/master/docs/getting-started.md#getting-started


const User = types.model({
    name: ""
})


const Todo = types.model({
    name: "",
    done: false
}).actions(self => {
    function setName(newName) {
        self.name = newName
    }

    function toggle() {
        self.done = !self.done
    }

    return {setName, toggle}
})


const RootStore = types.model({
    users: types.map(User),
    todos: types.optional(types.map(Todo), {})
}).actions(self => {
    function addTodo(id, name) {
        self.todos.set(id, Todo.create({ name }))
    }

    return {addTodo}
})


//
// const john = User.create()
// console.log("John (User):", john.toJSON())

// const eat = Todo.create({ name: "eat", done: true })
// console.log("Eat (Todo):", eat.toJSON())

const store = RootStore.create({
    users: { } // users is required here because it's not marked as optional
})
// console.log("store (RootStore):", store.toJSON())
global.store = store
store.addTodo(1, "Eat a cake")
console.log(getSnapshot(store)) // or: console.log(store.toJSON())
