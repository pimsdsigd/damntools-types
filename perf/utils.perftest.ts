import {Perf, Performer} from "@damntools.fr/performer"
import {containsProperty} from "../src"
import {concatArray} from "../src/core"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]

describe("utils", () => {
  it("containsProperty", done => {
    Perf.Test("containsProperty") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = new Array(count)
        for (let i = 0; i < count; i++) obj[i + ""] = i % 2
        return {
          test: () => {
            const res = Object.keys(obj).filter(row =>
              containsProperty(obj, row)
            )
            console.log(res.length)
          },
          compare: () => {
            const res = Object.keys(obj).filter(row =>
              Object.prototype.hasOwnProperty.call(obj, row)
            )
            console.log(res.length)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(60000)
})

describe("utils", () => {
  it("concatArray", done => {
    Perf.Test("concatArray") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = new Array(count)
        const copy = new Array(count)
        for (let i = 0; i < count; i++) {
          obj[i] = i % 2
          copy[i] = i % 2
        }
        return {
          test: () => {
            const number = concatArray(obj, copy)
            console.log(number.length)
          },
          compare: () => {
            const number = obj.concat(copy)
            console.log(number.length)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(60000)
})
