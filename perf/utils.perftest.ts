import {Perf, Performer} from "@damntools.fr/performer"
import {containsProperty} from "../src"
import {concatArray} from "../src/core"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]

describe("Utils", () => {
  it("containsProperty", done => {
    Perf.Test(this) // faster
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

    Performer.execSubscribed(done)
  }).timeout(60000)

  describe("concatArray", function () {
    it("fixedArray", function (done) {
      Perf.Test(this) // faster
        .I1K()
        .Repeat(5)
        .Do(() => {
          return {
            prepare: () => {
              const obj = new Array(1_000_000)
              const copy = new Array(1_000_000)
              for (let i = 0; i < 1_000_000; i++) {
                obj[i] = i % 2
                copy[i] = i % 2
              }
              return [obj, copy]
            },
            test: (count, ...args) => {
              concatArray(args[0], args[1])
            },
            compare: (count, ...args) => {
              args[0].concat(args[1])
            }
          }
        })

      Performer.execSubscribed(done)
    }).timeout(60000)

    it("iterationArraySize", function (done) {
      Perf.Test(this) // faster
        .Iterations(ITERATIONS)
        .Repeat(5)
        .Do(count => {
          const obj = new Array(count)
          const copy = new Array(count)
          for (let i = 0; i < count; i++) {
            obj[i] = i % 2
            copy[i] = i % 2
          }
          console.log(obj.length)
          return {
            repeatOutside: true,
            test: () => {
              concatArray(obj, copy)
            },
            compare: () => {
              obj.concat(copy)
            }
          }
        })

      Performer.execSubscribed(done)
    }).timeout(60000)
  })
})
