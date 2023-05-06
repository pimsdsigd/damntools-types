import {Dict, DictKeyType, DictObject} from "./Dict"
import {IllegalAccessError} from "../exceptions"
import {KV} from "./KV"

export class StaticKV<K extends DictKeyType, V> extends KV<K, V> {
  protected constructor(map?: DictObject<K, V>) {
    super(map)
  }

  put(): Dict<K, V> {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  remove(): Dict<K, V> {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  clear(): Dict<K, V> {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  putAll(): Dict<K, V> {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  filterInner(): Dict<K, V> {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  merge(): Dict<K, V> {
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
