import {Perf, Performer} from "@damntools.fr/performer"
import {ArrayList, toList} from "../src"

Perf.Test("hy")
  .Iterations([
    1, 1_000, 10_000, 100_000, 1_000_000
    // 25000000, 30000000, 35000000,
    // 40000000, 45000000
  ])
  .Do(count => {
    const array = new Array(count).fill(0)
    return {
      test: () =>
        new ArrayList(array)
          .stream()
          .map(v => v + 1)
          .collect(toList),
      compare: () => array.map(v => v + 1)
    }
  })

void Performer.execSubscribed()
