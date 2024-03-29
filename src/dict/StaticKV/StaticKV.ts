import {DictKeyType, Dict, DictObject} from "../../core"
import {IllegalAccessError} from "../../exceptions"
import {KV} from "../KV"

export class StaticKV<K extends DictKeyType, V> extends KV<K, V> {
  protected constructor(map?: DictObject<K, V>) {
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

  static from<K extends DictKeyType, V>(map: DictObject<K, V>): Dict<K, V> {
    return new StaticKV<K, V>(map)
  }

  static of<K extends DictKeyType, V>(map: Dict<K, V>): Dict<K, V> {
    return new StaticKV<K, V>(map.collect())
  }

  static empty<K extends DictKeyType, V>(): Dict<K, V> {
    return new StaticKV<K, V>()
  }
}
