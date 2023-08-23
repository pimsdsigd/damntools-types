import {Perf, Performer} from "@damntools.fr/performer"
import {ArrayList} from "../src"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]
const TIMEOUT = 60000

const generateData = count => {
  const array = []
  for (let i = 0; i < count; i++) array.push({id: i, value: Math.random()})
  return array
}

describe("perf.list", () => {
  it("filter", done => {
    Perf.Test("filter") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            const res = list
              .stream()
              .filter(row => row.id % 2 === 0)
              .collectArray()
            console.log(res.length)
          },
          compare: () => {
            const res = obj.filter(row => row.id % 2 === 0)
            console.log(res.length)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)

  it("reduce", done => {
    Perf.Test("reduce") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = generateData(count)
        const list = new ArrayList(obj)
        const fn = (o, v) => o + (v.id % 2)
        return {
          test: () => {
            const res = list.stream().reduce(fn, 0)
            console.log(res)
          },
          compare: () => {
            const res = obj.reduce(fn, 0)
            console.log(res)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)

  it("forEach", done => {
    Perf.Test("forEach") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            let other = 0
            list.forEach(r => (other = other + r.id))
            console.log(other)
          },
          compare: () => {
            let other = 0
            obj.forEach(r => (other = other + r.id))
            console.log(other)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)

  it("find", done => {
    Perf.Test("find") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const fn = v => v.id % 2 === 0
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            const other = list.stream().findIndex(fn)
            console.log(other)
          },
          compare: () => {
            const other = obj.findIndex(fn)
            console.log(other)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)

  it("findFirst", done => {
    Perf.Test("findFirst") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
          const fn = v =>v.id === 5_000_000 ||v.id === 500_000 ||v.id === 50_000 || v.id === 5_000 ||  v.id === 500
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            const other = list.stream().findFirst(fn)
            console.log(other.get())
          },
          compare: () => {
            const other = obj.filter(fn)[0]
            console.log(other)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)

  it("findLast", done => {
    Perf.Test("findLast") // faster
      .Iterations(ITERATIONS)
      .Do(count => {
        const fn = v => v.id === 500 || v.id === 5_000 ||v.id === 50_000 ||v.id === 500_000 ||v.id === 5_000_000
        const obj = generateData(count)
        const list = new ArrayList(obj)
        return {
          test: () => {
            const other = list.stream().findLast(fn)
            console.log(other.get())
          },
          compare: () => {
              const filtered = obj.filter(fn)
            const other = filtered[filtered.length -1 ]
            console.log(other)
          }
        }
      })

    Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)
})
