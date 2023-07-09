import {Dict, DictObject} from "../../core"
import {IllegalAccessError} from "../../exceptions"
import {KV} from "../KV"

export class StaticKV<V> extends KV<V> {
  protected constructor(map?: DictObject<V>) {
    super(map)
  }

  put(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  remove(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  clear(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  putAll(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  filter(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  merge(): this {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  static from<V>(map: DictObject<V>): Dict<V> {
    return new StaticKV<V>(map)
  }

  static of<V>(map: Dict<V>): Dict<V> {
    return new StaticKV<V>(map.collect())
  }

  static empty<V>(): Dict<V> {
    return new StaticKV<V>()
  }
}
