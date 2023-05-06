import {KV} from "./src"

export const PatternTableMap = KV.from<string, number>({
  "%black": 2,
  "%blue": 6
})

console.log(PatternTableMap.entries().stream().reverse().collect())
