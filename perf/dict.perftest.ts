import {Perf, Performer} from "@damntools.fr/performer"
import {ArrayList, KV} from "../src"

const ITERATIONS = [1_000, 10_000, 100_000, 1_000_000, 10_000_000]
const TIMEOUT = 60000

const generateData = count => {
  const obj = {}
  const keys = new ArrayList()
  for (let i = 0; i < count; i++) {
    obj[i + ""] = {id: i, value: Math.random()}
    keys.push(i + "")
  }
  return {
    keys,
    obj
  }
}

describe("perf.list", () => {
  it("filter", done => {
    Perf.Test("mapVsFor")
      .Iterations(ITERATIONS)
      .Do(count => {
        const data = generateData(count)
        const dataDict = {keys: data.keys, obj: KV.from(data.obj)}
        return {
          test: () => {
            let cpt = 0
            dataDict.obj.entries().forEach((f: any) => {
              cpt += f.value.id
            })
            console.log(cpt)
          },
          compare: () => {
            let cpt = 0
            dataDict.keys.forEach((f: any) => {
              // @ts-ignore
              cpt += dataDict.obj.get(f).id
            })
            console.log(cpt)
          }
        }
      })

    void Performer.execSubscribed().then(() => done())
  }).timeout(TIMEOUT)
})
