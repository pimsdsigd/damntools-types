import {Perf, Performer} from "@damntools.fr/performer"
import {Enum, Lists, toList} from "../src"

// const ITERATION_LIST = [2]
const ITERATION_LIST = [100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000]

class TestEnum extends Enum<any> {
  static V1 = new TestEnum("v1")
}

const obj = {
  id: 1,
  name: "sdfs",
  date: new Date().getTime(),
  other: "pokdsojdoig",
  rea: 684.46,
  enu: TestEnum.V1.key()
}

const mapper = obj => ({
  id: obj.id,
  name: obj.name,
  date: new Date().setTime(obj.date),
  other: obj.other,
  rea: obj.rea,
  enu: TestEnum.fromValue(obj.enu)
})

const filter = obj => obj.id % 2 === 0

Perf.Package("stream", perf => {
  perf.Group("transform", perf => {
    perf
      .Named("map")
      .Iterations(ITERATION_LIST)
      .Do(c => {
        const array = Lists.range(0, c)
          .getInner()
          .map(i => ({...obj, id: i}))
        const list = Lists.from(array)
        return {
          test: cc => {
            list.stream().map(mapper).collect(toList)
          },
          compare: cc => {
            array.map(mapper)
          },
          repeatOutside: true
        }
      })

    perf
      .Named("filter")
      .Iterations(ITERATION_LIST)
      .Do(c => {
        const array = Lists.range(0, c)
          .getInner()
          .map(i => ({...obj, id: i}))
        const list = Lists.from(array)
        return {
          test: cc => {
            list.stream().map(filter).collect(toList)
          },
          compare: cc => {
            array.map(filter)
          },
          repeatOutside: true
        }
      })
  })
})

void Performer.execSubscribed(() => ({}))
