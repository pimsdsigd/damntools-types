import {List} from "../List"
import {Optionable} from "../Optionable"
import {containsMethod, defined} from "../Utils"

export type DictObjectEntry<V> = {
  key: string
  value: V
}
export type DictObject<V> = {[key in string]: V}

export type DictEntryPredicate<V> = (entry: DictObjectEntry<V>) => boolean

export type DictLogFormatter<V> = (
  entry: DictObjectEntry<V>,
  dict: DictObject<V>
) => string

export interface Dict<V> {
  toString(): string
  /*
   * Mutations
   */

  put(key: string, value: V): this

  putAll(...obj: Array<DictObject<V>>): this

  merge(...dict: Array<Dict<V>>): this

  clear(): this

  remove(key: string): this

  /**
   * Filter the properties
   */
  filter(predicate: DictEntryPredicate<V>): this

  /*
   * Accessors
   */

  isEmpty(): boolean

  hasElements(): boolean

  hasKey(key: string): boolean

  equals(other: Dict<V>): boolean

  find(predicate: DictEntryPredicate<V>): V | undefined

  findOptional(predicate: DictEntryPredicate<V>): Optionable<V>

  count(predicate: DictEntryPredicate<V>): number

  size(): number

  get(key: string): V

  getOrDefault(key: string, defaultValue: V): V

  getOptional(key: string): Optionable<V>

  collect(): DictObject<V>

  keys(): List<string>

  values(): List<V>

  entries(): List<DictObjectEntry<V>>

  copy(): Dict<V>

  log(identifier?: string | number): this

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<V>): this

  /**
   * Returns a new Dict containing filtered properties
   */
  select(predicate: DictEntryPredicate<V>): Dict<V>
}

export const isDict = <T>(obj: Dict<T> | any): boolean => {
  return defined(obj) && containsMethod(obj, "collect") && containsMethod(obj, "entries")
}
