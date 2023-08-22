import {
  containsProperty,
  Dict,
  DictEntryPredicate,
  DictLogFormatter,
  DictObject,
  DictObjectEntry,
  List,
  Optionable
} from "../../core"
import {Collectors, Lists} from "../../utils"
import {Optional} from "../../optional"

const fromEntryFn = <K extends string, V>(
  entry: DictObjectEntry<K, V>
): [string, any] => [entry.key, entry.value]

export const fromEntriesFn = <K extends string, V>(
  entries: List<DictObjectEntry<K, V>>
): Dict<K, V> => {
  const obj = Object.fromEntries(entries.stream().map(fromEntryFn).collectArray())
  return KV.from(obj as DictObject<V>)
}

export class KV<K extends string, V> implements Dict<K, V> {
  protected _map: DictObject<V>
  private _size: number

  protected constructor(map?: DictObject<V>) {
    if (map) {
      this._map = {...map}
      this.setSize()
    } else {
      this._map = {} as DictObject<V>
      this.setSize(0)
    }
  }

  static from<K extends string, V>(map: DictObject<V>): Dict<K, V> {
    return new KV<K, V>(map)
  }

  static of<K extends string, V>(map: Dict<K, V>): Dict<K, V> {
    return this.from(map.collect())
  }

  static empty<K extends string, V>(): Dict<K, V> {
    return new KV<K, V>()
  }

  private setSize(size?: number) {
    this._size = size !== undefined ? size : Object.keys(this._map).length
  }

  put(key: K, value: V): this {
    this._map[key] = value
    this.setSize()
    return this
  }

  putAll(...obj: Array<DictObject<V>>): this {
    this._map = obj.reduce((old, cur) => ({...old, ...cur}), this._map)
    this.setSize()
    return this
  }

  merge(...dict: Array<Dict<K, V>>): this {
    this._map = dict.reduce((old, cur) => ({...old, ...cur.collect()}), this._map)
    this.setSize()
    return this
  }

  hasKey(key: K): boolean {
    return containsProperty(this._map as object, `${key}`)
  }

  clear(): this {
    this._map = {} as DictObject<V>
    this.setSize(0)
    return this
  }

  collect(): DictObject<V> {
    return {...this._map}
  }

  remove(key: K): this {
    delete this._map[key]
    this.setSize()
    return this
  }

  get(key: K): V {
    return this._map[key]
  }

  getOrDefault(key: K, defaultValue: V): V {
    if (this.hasKey(key)) return this.get(key)
    return defaultValue
  }

  getOptional(key: K): Optionable<V> {
    return this.hasKey(key) ? Optional.of(this.get(key)) : Optional.empty()
  }

  keys(): List<K> {
    return Lists.from(Object.keys(this._map)) as List<K>
  }

  values(): List<V> {
    return Lists.from(Object.values(this._map as object))
  }

  entries(): List<DictObjectEntry<K, V>> {
    return this.keys()
      .stream()
      .map(key => ({
        key,
        value: this._map[key]
      }))
      .collect(Collectors.toList)
  }

  size(): number {
    return this._size
  }

  copy(): Dict<K, V> {
    return new KV<K, V>(this._map)
  }

  equals(other: Dict<K, V>): boolean {
    return (
      !!other &&
      other.size() === this.size() &&
      this.entries()
        .stream()
        .reduce(
          (old, cur) => old && other.hasKey(cur.key) && other.get(cur.key) === cur.value,
          true
        )
    )
  }

  select(predicate: DictEntryPredicate<K, V>): Dict<K, V> {
    return fromEntriesFn(
      this.entries()
        .stream()
        .filter((entry): entry is DictObjectEntry<K, V> => predicate(entry))
        .collect(Collectors.toList)
    )
  }

  count(predicate: DictEntryPredicate<K, V>): number {
    return this.select(predicate).size()
  }

  filter(predicate: DictEntryPredicate<K, V>): this {
    const filtered = this.select(predicate)
    this.clear()
    this.merge(filtered)
    return this
  }

  find(predicate: DictEntryPredicate<K, V>): V | undefined {
    return this.findOptional(predicate).orElseUndefined()
  }

  findOptional(predicate: DictEntryPredicate<K, V>): Optionable<V> {
    return this.entries()
      .stream()
      .findOptional(entry => predicate(entry))
      .map(entry => entry.value)
  }

  hasElements(): boolean {
    return !this.isEmpty()
  }

  isEmpty(): boolean {
    return this._size === 0
  }

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<K, V>): this {
    const id = identifier || "KV"
    let message: any
    if (this.isEmpty()) message = "Empty"
    else if (entryFormatter)
      message = this.entries()
        .stream()
        .map(e => entryFormatter(e, this._map))
        .collectArray()
    else message = this._map
    console.log(id, message)
    return this
  }

  toString(): string {
    return
  }
}
