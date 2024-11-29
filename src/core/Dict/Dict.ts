import {List} from "../List"
import {Optionable} from "../Optionable"

export type DictKeyType = string | number | symbol

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
  toString(): string

  /*
   * Mutations
   */

  put(key: K, value: V): this

  putAll(...obj: Array<DictObject<K, V>>): this

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

  collect(): DictObject<K, V>

  keys(): List<K>

  values(): List<V>

  entries(): List<DictObjectEntry<K, V>>

  copy(): Dict<K, V>

  mapValues<O>(mapper: (value: V) => O): Dict<K, O>

  mapKeys<NK extends DictKeyType>(mapper: (value: K) => NK): Dict<NK, V>

  map<KO extends DictKeyType, O>(
    mapper: (key: K, value: V) => DictObjectEntry<KO, O>
  ): Dict<K, O>

  log(identifier?: string | number): this

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<K, V>): this

  /**
   * Returns a new Dict containing filtered properties
   */
  select(predicate: DictEntryPredicate<K, V>): Dict<K, V>
}

export const isDict = <K extends string, T>(obj: Dict<K, T> | any): obj is Dict<K, T> => {
  return !!obj && !!obj["__iamDict"]
}
