import {AsyncQueue} from '../dist'

const asyncQueue = new AsyncQueue()
asyncQueue.add("test1", (resolve) => {
    setTimeout(() => {
        console.log("1")
        resolve()
    }, 5000)
})

asyncQueue.add("test1", (resolve) => {
    setTimeout(() => {
        console.log("2")
        resolve()
    }, 3000)
})
asyncQueue.add("test2", (resolve) => {
    setTimeout(() => {
        console.log("3")
        resolve()
    }, 1000)
})
asyncQueue.add("test2", (resolve) => {
    setTimeout(() => {
        console.log("4")
        resolve()
    }, 1000)
})
