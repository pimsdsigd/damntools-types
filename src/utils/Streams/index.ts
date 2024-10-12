import {ListStream} from "../../stream"
import {Optional} from "../../optional"

export * from "./Streams"

Object.defineProperty(Array.prototype, "toStream", {
  value: function () {
    return new ListStream(this)
  },
  configurable: true
})

Object.defineProperty(Optional.prototype, "toStream", {
  value: function () {
    if (this.isEmpty()) return new ListStream()
    return new ListStream([this.get()])
  },
  configurable: true
})
