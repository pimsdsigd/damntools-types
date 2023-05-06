import {ArrayList} from "./ArrayList"
import {KV} from "../dict"

export * from "./List"
export * from "./Stream"
export * from "./ArrayList"
export * from "./ListStream"

Object.defineProperty(Array.prototype, "toList", {
  value: function () {
    return ArrayList.from(this)
  },
  configurable: true
})

Object.defineProperty(ArrayList.prototype, "toKV", {
  value: function () {
    return KV.from(this)
  },
  configurable: true
})
