import {Perf, Performer} from "@damntools.fr/performer"

Perf.Test("mapVsFor")
  .Iterations([
    1, 1_000, 10_000, 100_000, 1_000_000, 10_000_000
    // 25000000, 30000000, 35000000,
    // 40000000, 45000000
  ])
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

void Performer.execSubscribed()
