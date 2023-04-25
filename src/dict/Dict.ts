import {List} from "../list";

export type DictKeyType = string | number

export type DictObjectEntry<K extends DictKeyType, V> = {
  key: K
  value: V
}
export type DictObject<K extends DictKeyType, V> = {[key in K]: V}

export interface Dict<K extends DictKeyType, V> {
  put(key: K, value: V): void

  putAll(obj: DictObject<K, V>): void

  hasKey(key: K): boolean
  equals(other: Dict<K, V>): boolean

  clear(): void
  collect(): DictObject<K, V>

  get(key: K): V

  remove(key: K): void

  getOrDefault(key: K, defaultValue: V): V

  keys(): List<K>

  values(): List<V>

  entries(): List<DictObjectEntry<K, V>>

  size(): number

  copy(): Dict<K, V>
}
