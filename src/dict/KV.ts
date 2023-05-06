import {
  Dict,
  DictEntryPredicate,
  DictKeyType,
  DictLogFormatter,
  DictObject,
  DictObjectEntry
} from "./Dict"
import {ArrayList, List} from "../list"
import {containsProperty} from "../Utils"
import {TypeUtils} from "../types"
import {Optional} from "../optional"

const fromEntryFn = <K extends DictKeyType, V>(
  entry: DictObjectEntry<K, V>
): [string, any] => [entry.key as string, entry.value]

export const fromEntriesFn = <K extends DictKeyType, V>(
  entries: List<DictObjectEntry<K, V>>
): Dict<K, V> => {
  const obj = Object.fromEntries(entries.stream().map(fromEntryFn).collectArray())
  return KV.from(obj as DictObject<K, V>)
}

export class KV<K extends DictKeyType, V> implements Dict<K, V> {
  protected _map: DictObject<K, V>
  private _size: number

  constructor(map?: DictObject<K, V>) {
    if (map) {
      this._map = {...map}
      this.setSize()
    } else {
      this._map = {} as DictObject<K, V>
      this.setSize(0)
    }
  }

  static from<K extends DictKeyType, V>(map: DictObject<K, V>): Dict<K, V> {
    return new KV<K, V>(map)
  }

  static of<K extends DictKeyType, V>(map: Dict<K, V>): Dict<K, V> {
    return this.from(map.collect())
  }

  static empty<K extends DictKeyType, V>(): Dict<K, V> {
    return new KV<K, V>()
  }

  private setSize(size?: number) {
    this._size = size !== undefined ? size : Object.keys(this._map).length
  }

  put(key: K, value: V): Dict<K, V> {
    this._map[key] = value
    this.setSize()
    return this
  }

  putAll(obj: DictObject<K, V>): Dict<K, V> {
    this._map = {...this._map, ...obj}
    this.setSize()
    return this
  }

  merge(dict: Dict<K, V>): Dict<K, V> {
    if (dict) this.putAll(dict.collect())
    return this
  }

  hasKey(key: K): boolean {
    return containsProperty(this._map as object, `${key}`)
  }

  clear(): Dict<K, V> {
    this._map = {} as DictObject<K, V>
    this.setSize(0)
    return this
  }

  get(key: K): V {
    return this._map[key]
  }

  collect(): DictObject<K, V> {
    return {...this._map}
  }

  remove(key: K): Dict<K, V> {
    delete this._map[key]
    this.setSize()
    return this
  }

  getOrDefault(key: K, defaultValue: V): V {
    if (this.hasKey(key)) return this.get(key)
    return defaultValue
  }

  keys(): List<K> {
    return ArrayList.from(Object.keys(this._map) as Array<K>)
  }

  values(): List<V> {
    return ArrayList.from(Object.values(this._map as object))
  }

  entries(): List<DictObjectEntry<K, V>> {
    return this.keys()
      .stream()
      .map(key => ({
        key,
        value: this._map[key]
      }))
      .collect()
  }

  size(): number {
    return this._size
  }

  copy(): Dict<K, V> {
    return new KV<K, V>(this._map)
  }

  equals(other: Dict<K, V>): boolean {
    return (
      other &&
      other.size() === this.size() &&
      TypeUtils.equals(this._map, other.collect())
    )
  }

  count(predicate: DictEntryPredicate<K, V>): number {
    return this.filterOuter(predicate).size()
  }

  filterInner(predicate: DictEntryPredicate<K, V>): Dict<K, V> {
    const filtered = this.filterOuter(predicate)
    this.clear()
    this.merge(filtered)
    return this
  }

  filterOuter(predicate: DictEntryPredicate<K, V>): Dict<K, V> {
    return fromEntriesFn(
      this.entries()
        .stream()
        .filter(entry => predicate(entry))
        .collect()
    )
  }

  find(predicate: DictEntryPredicate<K, V>): V | undefined {
    return this.findOptional(predicate).orElseUndefined()
  }

  findOptional(predicate: DictEntryPredicate<K, V>): Optional<V> {
    return this.entries()
      .stream()
      .findOptional(entry => predicate(entry))
      .map(entry => entry.value)
  }

  getOptional(key: K): Optional<V> {
    return this.hasKey(key) ? Optional.of(this.get(key)) : Optional.empty()
  }

  hasElements(): boolean {
    return !this.isEmpty()
  }

  isEmpty(): boolean {
    return this._size === 0
  }

  log(identifier?: string | number, entryFormatter?: DictLogFormatter<K, V>): Dict<K, V> {
    const id = identifier || "KV"
    if (this.isEmpty()) console.debug(id, "Empty")
    else if (entryFormatter)
      console.debug(
        id,
        this.entries()
          .stream()
          .map(e => entryFormatter(e, this._map))
          .collectArray()
      )
    else console.debug(id, this._map)
    return this
  }
}
