import {Perf, Performer} from "@damntools.fr/performer"
import {ArrayList} from "../src"
import {List} from "../src/core"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]
const TIMEOUT = 60000

const generateNumbers = (count): List<number> => {
  const list = new ArrayList<number>()
  for (let i = 0; i < count; i++) {
    list.push(i)
  }
  return list
}

describe("perf.string", () => {
  it("number", done => {
    Perf.Test("concatVsTemplate")
      .Iterations(ITERATIONS)
      .Do(count => {
        const data = generateNumbers(count)
        return {
          test: () => {
            let res = ""
            data.forEach(f => {
              res = "" + f
            })
            console.log(res)
          },
          compare: () => {
            let res = ""
            data.forEach(f => {
              res = `${f}`
            })
            console.log(res)
          }
        }
      })

    Perf.Test("concatVsString")
      .Iterations(ITERATIONS)
      .Do(count => {
        const data = generateNumbers(count)
        return {
          test: () => {
            let res = ""
            data.forEach(f => {
              res = "" + f
            })
            console.log(res)
          },
          compare: () => {
            let res = ""
            data.forEach(f => {
              res = String(f)
            })
            console.log(res)
          }
        }
      })

    void Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)
})
