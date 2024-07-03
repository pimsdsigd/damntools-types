import {ListStream} from "../../stream";

export * from "./Streams"

Object.defineProperty(Array.prototype, "toStream", {
  value: function () {
    return new ListStream(this)
  },
  configurable: true
})
