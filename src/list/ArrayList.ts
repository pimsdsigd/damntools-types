import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../exceptions"
import {List} from "./List"
import {ClassType, containsMethod, containsProperty, equalsBetween} from "../Utils"
import {Optional} from "../optional"
import {Dict, DictKeyType, KeyValue, KeyValueCtor} from "../dict"
import {DictUtils} from "../DictUtils";

export class ArrayList<T> implements List<T> {
  protected readonly array: Array<T>

  private constructor(array?: Array<T> | any) {
    if (!!array && !Array.isArray(array)) throw new InvalidArrayError()
    this.array = array || []
  }

  get(index: number): T | undefined {
    if (!index && index !== 0) throw new InvalidIndexError()
    if (index < 0 || index >= this.array.length)
      throw new IndexOutOfBoundError(index, this.array.length)
    return this.array[index]
  }

  push(...items: Array<T | undefined>): List<T> {
    this.array.push(...items)
    return this
  }

  pushFirst(...items: Array<T | undefined>): List<T> {
    return new ArrayList<T>([].concat(items, this.array))
  }

  concat(...items: Array<Array<T> | List<T>>): List<T> {
    let container: Array<Array<T>> = []
    if (items && containsMethod(items, "size"))
      container = items.map(i => i as List<T>).map(i => i.collect())
    else if (items && containsProperty(items, "length"))
      container = items.map(i => i as Array<T>)
    return new ArrayList<T>(this.array.concat(...container))
  }

  reduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: List<T>
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduce(
      (p, c, i, a) => callbackFn(p, c, i, ArrayList.from(a)),
      initialValue
    )
  }

  reduceRight<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: List<T>
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduceRight(
      (p, c, i, a) => callbackFn(p, c, i, ArrayList.from(a)),
      initialValue
    )
  }

  reverse(): List<T> {
    this.array.reverse()
    return this
  }

  sort(compareFn?: (a: T, b: T) => number): List<T> {
    this.array.sort(compareFn)
    return this
  }

  join(separator?: string): string {
    return this.array.join(separator)
  }

  first(): T | undefined {
    if (this.size() > 0) return this.get(0)
    return undefined
  }

  last() {
    if (this.size() > 0) return this.get(-1)
    return undefined
  }

  shift(): List<T> {
    this.array.shift()
    return this
  }

  unshift(...items: Array<T>): List<T> {
    this.array.unshift(...items)
    return this
  }

  pop(): List<T> {
    this.array.pop()
    return this
  }

  collect(): Array<T> {
    return this.array
  }

  slice(start: number, end: number): List<T> {
    return new ArrayList<T>(this.array.slice(start, end))
  }

  splice(start: number, deleteCount?: number, ...items: T[]): List<T> {
    this.array.splice(start, deleteCount, ...items)
    return this
  }

  peek(action: (value: T, index?: number, array?: List<T>) => void): List<T> {
    return new ArrayList<T>(
      this.array.map((value, index, arr) => {
        action(value, index, ArrayList.from(arr))
        return value
      })
    )
  }

  peekPresent(action: (value: T, index?: number, arr?: List<T>) => void): List<T> {
    return new ArrayList<T>(
      this.array.map((value, index, arr) => {
        if (value) action(value, index, ArrayList.from(arr))
        return value
      })
    )
  }

  forEach(action: (value: T, index?: number, arr?: List<T>) => void): List<T> {
    this.array.forEach((value, index, arr) => action(value, index, ArrayList.from(arr)))
    return this
  }

  map<U>(action: (value: T, index?: number, arr?: List<T>) => U): List<U> {
    return new ArrayList<U>(
      this.array.map((value, index, arr) => action(value, index, ArrayList.from(arr)))
    )
  }

  mapDefined<U>(action: (value: T, index?: number, arr?: List<T>) => U): List<U> {
    return new ArrayList<U>(
      this.array.map((value, index, arr) =>
        value !== undefined && value !== null
          ? action(value, index, ArrayList.from(arr))
          : undefined
      )
    )
  }

  mapUndefined<U>(action: (value: T, index?: number, array?: List<T>) => U): List<U | T> {
    return new ArrayList<U | T>(
      this.array.map((value, index, arr) =>
        value === undefined || value === null
          ? action(value, index, ArrayList.from(arr))
          : value
      )
    )
  }

  flat<U>(depth?: number): List<U> {
    return new ArrayList<U>(
      this.array
        .map(item => {
          if (item instanceof ArrayList) return item.collect()
          return item
        })
        .flat(depth)
    )
  }

  flatMap<U>(
    action: (value: T, index?: number, arr?: List<T>) => ArrayList<U> | Array<U>,
    depth?: number
  ): List<U> {
    return this.map(action).flat(depth)
  }

  filterClass<U extends T>(type: ClassType<U>): List<U> {
    return this.filter(value => value instanceof type).map(value => value as U)
  }

  filter(predicate: (value: T, index: number, array: List<T>) => boolean): List<T> {
    return new ArrayList<T>(
      this.array.filter((v, i, a) => predicate(v, i, ArrayList.from(a)))
    )
  }

  filterPresent(): List<NonNullable<T>> {
    return new ArrayList<T>(this.array.filter(e => e !== undefined && e !== null))
  }

  filterNotPresent(): List<undefined | null> {
    return new ArrayList(this.array.filter(e => e === undefined || e === null))
  }

  every(predicate: (value: T, index: number, array: List<T>) => boolean): boolean {
    return this.array.every((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  some(predicate: (value: T, index: number, array: List<T>) => boolean): boolean {
    return this.array.some((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  none(predicate: (value: T, index: number, array: List<T>) => boolean): boolean {
    return !this.every(predicate)
  }

  findOrThrow(
    predicate: (value: T, index: number, array: List<T>) => boolean,
    exception: () => Error
  ): T {
    const found = this.array.find((v, i, a) => predicate(v, i, ArrayList.from(a)))
    if (found !== undefined) return found
    throw exception()
  }

  find(predicate: (value: T, index: number, array: List<T>) => boolean): T | undefined {
    return this.array.find((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  findIndex(predicate: (value: T, index: number, array: List<T>) => boolean): number {
    return this.array.findIndex((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  findOptional(
    predicate: (value: T, index: number, array: List<T>) => boolean
  ): Optional<T> {
    return Optional.nullable(this.find(predicate))
  }

  findFirst(): Optional<T> {
    if (this.isEmpty()) return Optional.empty()
    return Optional.of(this.get(0))
  }

  findLast(): Optional<T> {
    if (this.isEmpty()) return Optional.empty()
    return Optional.of(this.reverse().get(0))
  }

  count(predicate: (value: T, index: number, array: List<T>) => boolean): number {
    return this.array.filter((v, i, a) => predicate(v, i, ArrayList.from(a))).length
  }

  size(): number {
    return this.array.length
  }

  isEmpty(): boolean {
    return this.size() <= 0
  }

  unique(equalityPredicate?: (a: T, b: T) => boolean): List<T> {
    const predicate = equalityPredicate || equalsBetween
    return new ArrayList<T>(
      this.array.reduce(
        (acc, cur) =>
          acc.findIndex(i => predicate(i, cur)) > -1 ? acc : acc.concat([cur]),
        []
      )
    )
  }

  equals<O>(
    other: Array<O> | ArrayList<O | T>,
    equalityPredicate?: (a: O | T, b: O | T) => boolean
  ): boolean {
    const predicate = equalityPredicate || equalsBetween
    const otherArray = Array.isArray(other) ? other : other.collect()
    return this.array.every((value, index) => {
      return predicate(value, otherArray[index])
    })
  }

  static of<T>(...items: Array<T | undefined>): List<T> {
    const list = new ArrayList<T>()
    list.push(...items)
    return list
  }

  static from<T>(array: Array<T>): List<T> {
    if (Array.isArray(array)) return new ArrayList(array)
    else throw new InvalidArrayError()
  }

  static empty<T>(): List<T> {
    return new ArrayList<T>()
  }

  static range(start: number, end: number): List<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new ArrayList<number>(range)
  }

  log(
    identifier?: string | number,
    entryFormatter?: (entry: T, index: number, array: List<T>) => string
  ): List<T> {
    const id = identifier || "ListLog"
    if (this.isEmpty()) console.debug(id, "Empty")
    else if (entryFormatter)
      console.debug(
        id,
        this.array.map((e, i, a) => entryFormatter(e, i, ArrayList.from(a)))
      )
    else console.debug(id, this.array)
    return this
  }


  clear(): void {
    this.array.splice(0, this.array.length)
  }

  toDict<K extends DictKeyType>(): Dict<K, T> {
    if (this.isEmpty()) return new KeyValue()
    const first = this.get(1)
    if (Array.isArray(first)) {
      const dict = Object.fromEntries(this.array as any[])
      return new KeyValue<K, T>(dict as KeyValueCtor<K, T>)
    } else if (
      typeof first === "object" &&
      containsProperty(first, "key") &&
      containsProperty(first, "value")
    ) {
      const dict = DictUtils.fromEntries(this as List<any>)
      return new KeyValue<K, T>(dict as KeyValueCtor<K, T>)
    }
    throw new InvalidArrayError(
      "Array should contains either array entries or {key, value} entries !"
    )
  }
}
