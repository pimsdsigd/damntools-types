import {ListStream} from "../../stream"
import {Optional} from "../../optional"
import {KV} from "../../dict";
import {defined} from "../../core";
import {ArrayList} from "../../list";

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


Object.defineProperty(ListStream.prototype, "groupByKey", {
  value: function (key: any) {
    if (this.array.length === 0)
      return KV.empty()
    const kv = KV.empty<any, any>()
    this.array.forEach(element => {
      const value = element[key] as any
      if (defined(value)) {
        if (!kv.hasKey(value))
          kv.put(value, new ArrayList())
        kv.get(value).push(element)
      } else {
        if (!kv.hasKey("undefined"))
          kv.put("undefined", new ArrayList())
        kv.get("undefined").push(element)
      }
    })
    return kv;
  },
  configurable: true
})

Object.defineProperty(ListStream.prototype, "groupByFunction", {
  value: function (fn: (item: any) => any) {
    if (this.array.length === 0)
      return KV.empty()
    const kv = KV.empty<any, any>()
    this.array.forEach(element => {
      const value = fn(element) as any
      if (defined(value)) {
        if (!kv.hasKey(value))
          kv.put(value, new ArrayList())
        kv.get(value).push(element)
      } else {
        if (!kv.hasKey("undefined"))
          kv.put("undefined", new ArrayList())
        kv.get("undefined").push(element)
      }
    })
    return kv;
  },
  configurable: true
})
