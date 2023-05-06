import {List} from "../list"
import {Optional} from "../optional"

export type DictKeyType = string | number

export type DictObjectEntry<K extends DictKeyType, V> = {
  key: K
  value: V
}
export type DictObject<K extends DictKeyType, V> = {[key in K]: V}

export type DictEntryPredicate<K extends DictKeyType, V> = (
  entry: DictObjectEntry<K, V>
) => boolean

export type DictLogFormatter<K extends DictKeyType, V> = (
  entry: DictObjectEntry<K, V>,
  dict: DictObject<K, V>
) => string

export interface Dict<K extends DictKeyType, V> {
  put(key: K, value: V): Dict<K, V>

  putAll(obj: DictObject<K, V> | Dict<K, V>): Dict<K, V>

  merge(dict: Dict<K, V>): Dict<K, V>

  clear(): Dict<K, V>

  remove(key: K): Dict<K, V>

  isEmpty(): boolean

  hasElements(): boolean

  hasKey(key: K): boolean

  equals(other: Dict<K, V>): boolean

  find(predicate: DictEntryPredicate<K, V>): V | undefined

  findOptional(predicate: DictEntryPredicate<K, V>): Optional<V>

  count(predicate: DictEntryPredicate<K, V>): number

  size(): number

  get(key: K): V

  getOrDefault(key: K, defaultValue: V): V

  getOptional(key: K): Optional<V>

  collect(): DictObject<K, V>

  keys(): List<K>

  values(): List<V>

  entries(): List<DictObjectEntry<K, V>>

  copy(): Dict<K, V>

  log(identifier?: string | number): Dict<K, V>

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<K, V>): Dict<K, V>

  /**
   * Returns the same Dict with inner map updated
   */
  filterInner(predicate: DictEntryPredicate<K, V>): Dict<K, V>

  /**
   * Returns a new Dict containing filtered entries
   */
  filterOuter(predicate: DictEntryPredicate<K, V>): Dict<K, V>
}
