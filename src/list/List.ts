import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../exceptions"
import {Streamable} from "../Streamable"

export class List<T> implements Streamable<T> {
  protected readonly array: Array<T>

  constructor(array?: Array<T> | any) {
    if (!!array && !Array.isArray(array)) throw new InvalidArrayError()
    this.array = array || []
  }

  get(index: number): T | undefined {
    if (!index && index !== 0) throw new InvalidIndexError()
    if (index < 0 || index >= this.array.length)
      throw new IndexOutOfBoundError(index, this.array.length)
    return this.array[index]
  }

  push(...items: Array<T>): List<T> {
    this.array.push(...items)
    return this
  }

  concat(...items: Array<Array<T>>): List<T> {
    return new List<T>(this.array.concat(...items))
  }

  reduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex?: number,
      array?: T[]
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduce(callbackFn, initialValue)
  }

  reduceRight<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex?: number,
      array?: T[]
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduceRight(callbackFn, initialValue)
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
    return new List<T>(this.array.slice(start, end))
  }

  splice(start: number, deleteCount?: number, ...items: T[]): List<T> {
    this.array.splice(start, deleteCount, ...items)
    return this
  }

  peek(action: (value: T, index?: number, array?: Array<T>) => void): List<T> {
    return new List<T>(
      this.array.map((value, index, arr) => {
        action(value, index, arr)
        return value
      })
    )
  }

  peekPresent(
    action: (value: T, index?: number, arr?: Array<T>) => void
  ): List<T> {
    return new List<T>(
      this.array.map((value, index, arr) => {
        if (value) action(value, index, arr)
        return value
      })
    )
  }

  forEach(action: (value: T, index?: number, arr?: Array<T>) => void): List<T> {
    this.array.forEach((value, index, arr) => action(value, index, arr))
    return this
  }

  map<U>(action: (value: T, index?: number, arr?: Array<T>) => U): List<U> {
    return new List<U>(
      this.array.map((value, index, arr) => action(value, index, arr))
    )
  }

  mapDefined<U>(
    action: (value: T, index?: number, arr?: Array<T>) => U
  ): List<U> {
    return new List<U>(
      this.array.map((value, index, arr) =>
        value !== undefined && value !== null
          ? action(value, index, arr)
          : undefined
      )
    )
  }

  mapUndefined<U>(
    action: (value: T, index?: number, array?: Array<T>) => U
  ): List<U | T> {
    return new List<U | T>(
      this.array.map((value, index, arr) =>
        value === undefined || value === null
          ? action(value, index, arr)
          : value
      )
    )
  }

  flat<U>(depth?: number) : List<U>{
    return new List<U>(this.array.map(item => {
      if( item instanceof List)
        return item.collect();
      return item;
    }).flat(depth))
  }

  flatMap<U>(action: (value: T, index?: number, arr?: Array<T>) => List<U> | Array<U>, depth?: number) : List<U>{
    return this.map(action).flat(depth)
  }

  filter(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): List<T> {
    return new List<T>(this.array.filter(predicate))
  }

  filterPresent(): List<T> {
    return new List<T>(this.array.filter(e => e !== undefined && e !== null))
  }

  filterNotPresent(): List<T> {
    return new List<T>(this.array.filter(e => e === undefined || e === null))
  }

  every(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean {
    return this.array.every(predicate)
  }

  some(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean {
    return this.array.some(predicate)
  }

  none(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean {
    return !this.every(predicate)
  }

  findOrThrow(
    predicate: (value: T, index: number, array: Array<T>) => boolean,
    exception: () => Error
  ): T {
    const found = this.array.find(predicate)
    if (found !== undefined) return found
    throw exception()
  }

  find(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): T | undefined {
    return this.array.find(predicate)
  }

  findIndex(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): number {
    return this.array.findIndex(predicate)
  }

  count(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): number {
    return this.array.filter(predicate).length
  }

  size(): number {
    return this.array.length
  }

  unique(equalityPredicate?: (a: T, b: T) => boolean): List<T> {
    const predicate = equalityPredicate || ((l: T, r: T) => l === r)
    return new List<T>(
      this.array.reduce(
        (acc, cur) =>
          acc.findIndex(i => predicate(i, cur)) > -1 ? acc : acc.concat([cur]),
        []
      )
    )
  }

  equals<O>(
    other: Array<O> | List<O | T>,
    equalityPredicate?: (a: O | T, b: O | T) => boolean
  ): boolean {
    const predicate = equalityPredicate || ((l: O | T, r: O | T) => l === r)
    const otherArray = Array.isArray(other) ? other : other.collect()
    return this.array.every((value, index) => {
      return predicate(value, otherArray[index])
    })
  }

  static of<T>(...items: Array<T>): List<T> {
    const list = new List<T>()
    list.push(...items)
    return list
  }

  static from<T>(array: Array<T>): List<T> {
    if (Array.isArray(array)) return new List(array)
    else throw new InvalidArrayError()
  }

  static empty<T>(): List<T> {
    return new List<T>()
  }

  static range(start: number, end: number): List<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new List<number>(range)
  }
}
