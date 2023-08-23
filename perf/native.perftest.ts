import {Perf, Performer} from "@damntools.fr/performer"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]
Perf.Test("mapVsFor")
  .Iterations(ITERATIONS)
  .Do(count => {
    const array = new Array(count).fill(0)
    return {
      test: () => console.log(array.map(v => v + 1).length),
      compare: () => {
        const other = []
        for (let i = 0; i < array.length; i++) other[i] = array[i] + 1
        console.log(other.length)
      }
    }
  })

Perf.Test("filterVsFor")
  .Iterations(ITERATIONS)
  .Do(count => {
    const array = []
    for (let i = 0; i < count; i++) array[i + ""] = {id: i, key: Math.random()}
    return {
      test: () => console.log(array.filter(v => v.id % 2 === 0).length),
      compare: () => {
        const other = []
        for (let i = 0; i < array.length; i++) {
          if (array[i] % 2 === 0) other.push(array[i])
        }
        console.log(other.length)
      }
    }
  })

Perf.Test("reduceVsFor")
  .Iterations(ITERATIONS)
  .Do(count => {
    const array = []
    for (let i = 0; i < count; i++) array[i + ""] = {id: i, key: Math.random()}
    const fn = (o, v) => o + (v.id % 2)
    return {
      test: () => {
        console.log(array.reduce(fn, 0))
      },
      compare: () => {
        let other = 0
        for (let i = 0; i < array.length; i++) {
          other += fn(other, array[i])
        }
        console.log(other)
      }
    }
  })
Perf.Test("forEachVsFor")
  .Iterations(ITERATIONS)
  .Do(count => {
    const array = []
    for (let i = 0; i < count; i++) array[i + ""] = {id: i, key: Math.random()}
    return {
      test: () => {
        let other = 0
        array.forEach(r => (other = other + r.id))
        console.log(other)
      },
      compare: () => {
        let other = 0
        for (let i = 0; i < array.length; i++) {
          other = other + array[i].id
        }
        console.log(other)
      }
    }
  })
Perf.Test("findVsFor")
  .Iterations(ITERATIONS)
  .Do(count => {
    const array = []
    for (let i = 0; i < count; i++) array[i + ""] = {id: i, key: Math.random()}
    const fn = v => v.id % 2 === 0
    return {
      test: () => {
        const other = array.find(fn)
        console.log(other.length)
      },
      compare: () => {
        const other = []
        for (let i = 0; i < array.length; i++) {
          const v = array[i]
          if (fn(v)) {
            other.push(v)
            break
          }
        }
        console.log(other.length)
      }
    }
  })

void Performer.execSubscribed()
