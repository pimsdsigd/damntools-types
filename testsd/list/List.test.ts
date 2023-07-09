import {Collectors, Lists} from "../../src"
import {Functions} from "../../src/utils/Functions/Functions"

const fdsf = Lists.from([{a: {n: 1}}, {a: {n: 3}}, {a: {n: 2}}])
  .stream()
  .map(Functions.pathAccessor("a.n"))
  .collect(Collectors.max)

console.log(fdsf)
