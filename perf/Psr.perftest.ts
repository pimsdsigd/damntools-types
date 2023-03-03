import {Perf} from "@damntools.fr/performer"

Perf.Test("hy")
  .Iterations([
    1, 10000000, 20000000
    // 25000000, 30000000, 35000000,
    // 40000000, 45000000
  ])
  .Do(count => ({
    test: () => new Array(count).fill(Math.random()),
    compare: () => new Array(count).fill(0)
  }))
