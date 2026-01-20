import {Lists} from "./Lists"
import {UniqueList} from "../../list"

export * from "./Lists"
export * from "./Queues"

Object.defineProperty(Array.prototype, "toList", {
  value: function () {
    return Lists.from(this)
  },
  configurable: true
})

Object.defineProperty(Array.prototype, "toSet", {
  value: function () {
    return new UniqueList(this)
  },
  configurable: true
})
