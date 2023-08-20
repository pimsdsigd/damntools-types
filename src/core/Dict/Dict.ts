import {List} from "../List"
import {Optionable} from "../Optionable"
import {containsMethod, defined} from "../Utils"

export type DictKey<K extends string> = string | K

export type DictObjectEntry<K extends string, V> = {
  key: K
  value: V
}
export type DictObject<V> = {[key in string]: V}

export type DictEntryPredicate<K extends string, V> = (
  entry: DictObjectEntry<K, V>
) => boolean

export type DictLogFormatter<K extends string, V> = (
  entry: DictObjectEntry<K, V>,
  dict: DictObject<V>
) => string

export interface Dict<K extends string, V> {
  toString(): string

  /*
   * Mutations
   */

  put(key: K, value: V): this

  putAll(...obj: Array<DictObject<V>>): this

  merge(...dict: Array<Dict<K, V>>): this

  clear(): this

  remove(key: K): this

  /**
   * Filter the properties
   */
  filter(predicate: DictEntryPredicate<K, V>): this

  /*
   * Accessors
   */

  isEmpty(): boolean

  hasElements(): boolean

  hasKey(key: K): boolean

  equals(other: Dict<K, V>): boolean

  find(predicate: DictEntryPredicate<K, V>): V | undefined

  findOptional(predicate: DictEntryPredicate<K, V>): Optionable<V>

  count(predicate: DictEntryPredicate<K, V>): number

  size(): number

  get(key: K): V

  getOrDefault(key: K, defaultValue: V): V

  getOptional(key: K): Optionable<V>

  collect(): DictObject<V>

  keys(): List<K>

  values(): List<V>

  entries(): List<DictObjectEntry<K, V>>

  copy(): Dict<K, V>

  log(identifier?: string | number): this

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<K, V>): this

  /**
   * Returns a new Dict containing filtered properties
   */
  select(predicate: DictEntryPredicate<K, V>): Dict<K, V>
}

export const isDict = <K extends string, T>(obj: Dict<K, T> | any): obj is Dict<K, T> => {
  return defined(obj) && containsMethod(obj, "collect") && containsMethod(obj, "entries")
}
