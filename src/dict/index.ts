import {KV} from "./KV"

export * from "./Dict"
export * from "./KV"
export * from "./StaticKV"

Object.defineProperty(Object.prototype, "toKV", {
  value: function () {
    return KV.from(this)
  },
  configurable: true
})
