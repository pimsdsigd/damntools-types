
import {Perf, Performer} from "@damntools.fr/performer";
import {ArrayList, KV} from "../src";


const generateData = (count) => {
    console.log("generating data")
    const array = new Array(count)
    for (let i = 0; i < count; i++)
        array.push({id: i, value: Math.random()})
    console.log("done")
    return array
}

const  cache = KV.empty()


Perf.Test("mapVsFor")
    .Iterations([
        1, 1_000, 10_000, 100_000, 1_000_000
    ])
    .Do(count => {
        const array = generateData(count)
        const list = new ArrayList(array)
        return {
            test: () => {
                list.forEach(row => {
                    cache.put(row.id, row)
                })
                console.log(cache.size())
            },
            compare: () => {
                const obj = {}
                array.forEach(row => {
                   obj[row.id] = row
                })
                console.log(Object.keys(obj).length)
            }
        }
    })

void Performer.execSubscribed()


