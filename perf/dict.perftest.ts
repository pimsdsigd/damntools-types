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

describe("KV", () => {
  it("mapVsFor", function (done) {
    Perf.Test(this)
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

    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  it("entries", done => {
    Perf.Test(this)
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
            for (const key in data.obj) {
              cpt += data.obj[key].id
            }
            console.log(cpt)
          }
        }
      })
    Performer.execSubscribed(done)
  }).timeout(TIMEOUT)

  describe("keys", () => {
    it("keysVsObjectKeys", function (done) {
      Perf.Test(this) // faster
        .Iterations(ITERATIONS)
        .Do(count => {
          const cache = KV.empty()
          const obj = {}
          for (let i = 0; i < count; i++) {
            cache.put("" + i, {id: i, value: Math.random()})
            obj[i] = {id: i, value: Math.random()}
          }
          const filterFn = (v: any) => v.endsWith("000")
          return {
            test: () => {
              const v = cache.keys().stream().filter(filterFn).collectArray()
              console.log(v.length)
            },
            compare: () => {
              const v = Object.keys(obj).filter(filterFn)
              console.log(v.length)
            }
          }
        })
      Performer.execSubscribed(done)
    })

    it("keysVsObjectKeys", function (done) {
      Perf.Test("keysVsFor") // faster
        .Iterations(ITERATIONS)
        .Do(count => {
          const cache = KV.empty()
          const obj = {}
          for (let i = 0; i < count; i++) {
            cache.put("" + i, {id: i, value: Math.random()})
            obj[i] = {id: i, value: Math.random()}
          }
          return {
            test: () => {
              const v = cache.filter(e => !e.key)
              console.log(v.size())
            },
            compare: () => {
              const v = Object.entries(obj).filter(e => !e[0])
              console.log(v.length)
            }
          }
        })
      Performer.execSubscribed(done)
    }).timeout(60000)
  })
})
