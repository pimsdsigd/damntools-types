import {Perf, Performer} from "@damntools.fr/performer"
import {ArrayList} from "../src"

const ITERATIONS = [10_000, 100_000, 1_000_000, 10_000_000]
const TIMEOUT = 60000

const generateData = count => {
  const array = []
  for (let i = 0; i < count; i++) array.push({id: i, value: Math.random()})
  return array
}

describe("ArrayList", () => {
  it("filter", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Repeat(5)
      .Do(iteration => {
        const obj = generateData(iteration)
        const list = new ArrayList(obj).stream()
        return {
          test: () => {
            list.filter(row => row.id % 2 === 0)
          },
          compare: () => {
            obj.filter(row => row.id % 2 === 0)
          },
          repeatOutside: true
        }
      })
    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("reduce", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Repeat(5)
      .Do(count => {
        const obj = generateData(count)
        const list = new ArrayList(obj).stream()
        const fn = (o, v) => o + (v.id % 2)
        return {
          test: () => {
            list.reduce(fn, 0)
          },
          compare: () => {
            obj.reduce(fn, 0)
          },
          repeatOutside: true
        }
      })

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("forEach", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Repeat(5)
      .Do(count => {
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            let other = 0
            list.forEach(r => (other = other + r.id))
          },
          compare: () => {
            let other = 0
            obj.forEach(r => (other = other + r.id))
          },
          repeatOutside: true
        }
      })

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("findIndex", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Repeat(5)
      .Do(count => {
        const fn = v => v.id % 2 === 0
        const obj = generateData(count)
        const list = new ArrayList(obj).stream()
        return {
          test: () => {
            list.findIndex(fn)
          },
          compare: () => {
            obj.findIndex(fn)
          },
          repeatOutside: true
        }
      })

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("findFirst", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Repeat(5)
      .Do(count => {
        const fn = v =>
          v.id === 5_000_000 ||
          v.id === 500_000 ||
          v.id === 50_000 ||
          v.id === 5_000 ||
          v.id === 500
        const obj = generateData(count)
        const list = new ArrayList(obj).stream()
        return {
          test: () => {
            const other = list.findFirst(fn)
            console.log(other.get())
          },
          compare: () => {
            const other = obj.filter(fn)[0]
            console.log(other)
          },
          repeatOutside: true
        }
      })

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("findLast", function (done) {
    Perf.Test(this) // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const fn = v =>
          v.id === 500 ||
          v.id === 5_000 ||
          v.id === 50_000 ||
          v.id === 500_000 ||
          v.id === 5_000_000
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            const other = list.stream().findLast(fn)
            console.log(other.get())
          },
          compare: () => {
            const filtered = obj.filter(fn)
            const other = filtered[filtered.length - 1]
            console.log(other)
          }
        }
      })

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)
})
