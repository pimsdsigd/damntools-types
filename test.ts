import {KeyValue} from "./src";

export const PatternTableMap = KeyValue.from<string, number>({
    "%black": 2,
    "%blue": 6
})

console.log(PatternTableMap.keys())