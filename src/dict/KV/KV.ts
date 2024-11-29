import {
  containsProperty,
  Dict,
  DictEntryPredicate,
  DictKeyType,
  DictLogFormatter,
  DictObject,
  DictObjectEntry,
  List,
  Optionable
} from "../../core"
import {Optional} from "../../optional"
import {StaticArrayList} from "../../list"
import {toArray} from "../../utils"

const fromEntryFn = <K extends DictKeyType, V>(
  entry: DictObjectEntry<K, V>
): [DictKeyType, any] => [entry.key, entry.value]

export const fromEntriesFn = <K extends DictKeyType, V>(
  entries: List<DictObjectEntry<K, V>>
): Dict<K, V> => {
  const obj = Object.fromEntries(
    entries.stream().map(fromEntryFn).collectArray()
  ) as DictObject<K, V>
  return KV.from(obj)
}

export class KV<K extends DictKeyType, V> implements Dict<K, V> {
  protected _map: DictObject<K, V>
  private readonly __iamDict = true

  protected constructor(map?: DictObject<K, V>) {
    if (map) {
      this._map = {...map}
    } else {
      this._map = {} as DictObject<K, V>
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

  put(key: K, value: V): this {
    this._map[key] = value
    return this
  }

  putAll(...obj: Array<DictObject<K, V>>): this {
    this._map = obj.reduce((old, cur) => ({...old, ...cur}), this._map)
    return this
  }

  merge(...dict: Array<Dict<K, V>>): this {
    this._map = dict.reduce((old, cur) => ({...old, ...cur.collect()}), this._map)
    return this
  }

  hasKey(key: K): boolean {
    return containsProperty(this._map as object, String(key))
  }

  clear(): this {
    this._map = {} as DictObject<K, V>
    return this
  }

  collect(): DictObject<K, V> {
    return {...this._map}
  }

  remove(key: K): this {
    delete this._map[key]
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
    return Optional.nullable(this.get(key))
  }

  keys(): List<K> {
    return new StaticArrayList<K>(Object.keys(this._map) as Array<K>)
  }

  values(): List<V> {
    return new StaticArrayList<V>(Object.values(this._map) as Array<V>)
  }

  entries(): List<DictObjectEntry<K, V>> {
    return this.keys()
      .stream()
      .map(key => ({
        key,
        value: this._map[key]
      }))
      .collect(items => new StaticArrayList(items))
  }

  size(): number {
    return Object.keys(this._map).length
  }

  copy(): Dict<K, V> {
    return new KV<K, V>(this._map)
  }

  mapValues<O>(mapper: (value: V) => O): Dict<K, O> {
    const entries = this.entries()
      .stream()
      .map(e => [e.key, mapper(e.value)])
      .collect(toArray)
    const obj = Object.fromEntries(entries)
    return new KV<K, O>(obj)
  }

  mapKeys<NK extends DictKeyType>(mapper: (value: K) => NK): Dict<NK, V> {
    const entries: [NK, V][] = this.entries()
      .stream()
      .map<[NK, V]>(e => [mapper(e.key), e.value])
      .collect(toArray)
    const obj = Object.fromEntries(entries)
    return new KV<NK, V>(obj as any)
  }

  map<KO extends DictKeyType, O>(
    mapper: (key: K, value: V) => DictObjectEntry<KO, O>
  ): Dict<K, O> {
    const entries = this.entries()
      .stream()
      .map<[KO, O]>(e => {
        const mapped = mapper(e.key, e.value)
        return  [mapped.key, mapped.value]
      })
      .collect(toArray)
    const obj = Object.fromEntries(entries)
    return new KV<K, O>(obj as any)
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
        .collect(items => new StaticArrayList(items))
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
    return this.size() === 0
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
