import {Perf, Performer} from "@damntools.fr/performer"
import {defined, Optional} from "../src"
import {Optionable} from "../src/core"
import {ValueOptional} from "../src/optional/Optional/ValueOptional"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]

abstract class TestP {
  id: number

  run() {
    console.log("")
  }
}

class Test1 extends TestP {
  map(action): Optionable<any> {
    const value = action(this)
    return new ValueOptional(value)
  }

  orElseUndefined() {
    return this
  }
}

class Test2 extends TestP {
  map() {
    return this
  }

  orElseUndefined() {
    return undefined
  }
}

const generateData = count => {
  console.log(`generating data ${count}`)
  const array = []
  for (let i = 0; i < count; i++) array.push({id: i, value: Math.random()})
  console.log("done")
  return array
}

const generateTest1 = count => {
  console.log(`generating data ${count}`)
  const array = []
  for (let i = 0; i < count; i++) array.push(new Test1())
  console.log("done")
  return array
}

const generateTest2 = count => {
  console.log(`generating data ${count}`)
  const array = []
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) array.push(new Test1())
    else array.push(new Test2())
  }
  console.log("done")
  return array
}
generateTest2(5)

describe("optional", () => {
  it("isPresent", done => {
    Perf.Test("isPresent") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = generateData(count)
        const opt = obj.map(Optional.of)
        return {
          test: () => {
            const res = opt.filter(row => row.isPresent())
            console.log(res.length)
          },
          compare: () => {
            const res = obj.filter(row => defined(row))
            console.log(res.length)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(60000)

  it("map", done => {
    Perf.Test("map all present") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = generateData(count)
        const opt = obj.map(Optional.of)
        return {
          test: () => {
            const res = opt.map(row => row.map(r => r.id).orElseUndefined())
            console.log(res.length)
          },
          compare: () => {
            const res = obj.map(row => row.id || undefined)
            console.log(res.length)
          }
        }
      })
    Performer.execSubscribed().then(() => done())
  }).timeout(60000)

  it("other", done => {
    Perf.Test("map all present") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const t = generateTest1(count)
        const c = generateTest1(count)
        return {
          test: () => {
            const res = t.map(row => row.map(r => r.id).orElseUndefined())
            console.log(res.length)
          },
          compare: () => {
            const res = c.map(row => row.id)
            console.log(res.length)
          }
        }
      })
    Performer.execSubscribed().then(() => done())
  }).timeout(60000)
})
