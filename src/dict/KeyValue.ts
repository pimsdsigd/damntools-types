import {Dict, DictKeyType, DictObject, DictObjectEntry} from "./Dict"
import {ArrayList, List} from "../list";
import {containsProperty, equalsBetween} from "../Utils";
import {DictUtils} from "../DictUtils";
import {IllegalAccessError} from "../exceptions";

export type KeyValueCtor<K extends DictKeyType, V> = DictObject<K, V> | Dict<K, V>

const fromEntryFn = <K extends DictKeyType, V>(
  entry: DictObjectEntry<K, V>
): [string, any] => [entry.key as string, entry.value]

export class KeyValue<K extends DictKeyType, V> implements Dict<K, V> {
  protected _map: DictObject<K, V>
  private _size: number

  constructor(map?: KeyValueCtor<K, V>) {
    if (map instanceof KeyValue) {
      const oKeyValue = (map as KeyValue<K, V>)._map
      this._map = {...oKeyValue}
    } else if (map) {
      this._map = map as DictObject<K, V>
    } else this._map = {} as DictObject<K, V>
    this.setSize()
  }

  private setSize(size?: number) {
    this._size = size !== undefined ? size : Object.keys(this._map).length
  }

  put(key: K, value: V): void {
    this._map[key] = value
    this.setSize()
  }

  putAll(obj: DictObject<K, V>): void {
    this._map = {...this._map, ...obj}
    this.setSize()
  }

  hasKey(key: K): boolean {
    return containsProperty(this._map as object, `${key}`)
  }

  clear(): void {
    this._map = {} as DictObject<K, V>
    this.setSize(0)
  }

  get(key: K): V {
    return this._map[key]
  }

  collect(): DictObject<K, V> {
    return this._map
  }

  remove(key: K): void {
    delete this._map[key]
    this.setSize()
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
    return this.keys().map(key => ({
      key,
      value: this._map[key]
    }))
  }

  size(): number {
    return this._size
  }

  copy(): Dict<K, V> {
    return new KeyValue<K, V>({...this._map})
  }

  equals(other: Dict<K, V>): boolean {
    return (
      other &&
      other.size() === this.size() &&
      equalsBetween(this._map, other.collect())
    )
  }

  static from<K extends DictKeyType, V>(map: DictObject<K, V>): Dict<K, V> {
    return new KeyValue<K, V>(map)
  }

  static fromEntries<K extends DictKeyType, V>(
    entries: List<DictObjectEntry<K, V>>
  ): Dict<K, V> {
    const obj = DictUtils.fromEntries(entries.map(fromEntryFn))
    return this.from(obj as DictObject<K, V>)
  }

  static of<K extends DictKeyType, V>(map: Dict<K, V>): Dict<K, V> {
    return new KeyValue<K, V>(map.collect())
  }

  static empty<K extends DictKeyType, V>(): Dict<K, V> {
    return new KeyValue<K, V>({} as DictObject<K, V>)
  }
}



export class UnmodifiableKeyValue<K extends DictKeyType, V> extends KeyValue<K, V> {
  constructor(map: KeyValueCtor<K, V>) {
    super(map)
  }

  put() {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  remove() {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  putAll() {
    throw new IllegalAccessError("KeyValue is not modifiable !")
  }

  copy(): Dict<K, V> {
    return new UnmodifiableKeyValue<K, V>({...this._map})
  }

  static from<K extends DictKeyType, V>(map: DictObject<K, V>): Dict<K, V> {
    return new UnmodifiableKeyValue<K, V>(map)
  }

  static of<K extends DictKeyType, V>(map: KeyValue<K, V>): Dict<K, V> {
    return new UnmodifiableKeyValue<K, V>(map)
  }

  static empty<K extends DictKeyType, V>(): Dict<K, V> {
    return new UnmodifiableKeyValue<K, V>({} as DictObject<K, V>)
  }
}
