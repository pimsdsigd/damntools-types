import {Lists} from "./Lists"

export * from "./Lists"

Object.defineProperty(Array.prototype, "toList", {
  value: function () {
    return Lists.from(this)
  },
  configurable: true
})
