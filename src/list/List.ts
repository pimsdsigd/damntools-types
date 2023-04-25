import {ClassType} from "../Utils";
import {Optional} from "../optional";
import {Dict, DictKeyType} from "../dict";


export interface List<T> {
  /**
   * Returns item at provided index.
   *  If index is superior to array length, will return last item
   *  If index is inferior to 0, will return item positioned at length array minus index
   *    > index=-1 will return the last item, index=-2 the item before
   * @throws if index is undefined
   * @param index
   */
  get(index: number): T | undefined

  /**
   * Add items to the current array and returns the stream instance in order to chain calls
   * @param items
   */
  push(...items: Array<T | undefined>): List<T>

  pushFirst(...items: Array<T | undefined>): List<T>

  /**
   * Add elements from every array items to the current instance and returns the instance
   * @param items
   */
  concat(...items: Array<Array<T>>): List<T>

  /**
   * Add elements from every array items to the current instance and returns the instance
   * @param items
   */
  concat(...items: Array<List<T>>): List<T>

  reduce<U>(callbackFn: (previousValue: U, currentValue: T) => U, initialValue: U): U

  reduce<U>(
    callbackFn: (previousValue: U, currentValue: T, currentIndex: number) => U,
    initialValue: U
  ): U

  reduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: List<T>
    ) => U,
    initialValue: U
  ): U

  reduceRight<U>(callbackFn: (previousValue: U, currentValue: T) => U, initialValue: U): U

  reduceRight<U>(
    callbackFn: (previousValue: U, currentValue: T, currentIndex?: number) => U,
    initialValue: U
  ): U

  reduceRight<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex?: number,
      array?: List<T>
    ) => U,
    initialValue: U
  ): U

  reverse(): List<T>

  sort(compareFn?: (a: T, b: T) => number): List<T>

  join(separator?: string): string

  first(): T | undefined

  last(): T | undefined

  shift(): List<T>

  unshift(...items: Array<T>): List<T>

  pop(): List<T>

  collect(): Array<T>

  slice(start: number, end: number): List<T>

  splice(start: number, deleteCount?: number, ...items: T[]): List<T>

  peek(action: (value: T) => void): List<T>

  peek(action: (value: T, index: number) => void): List<T>

  peek(action: (value: T, index: number, array: List<T>) => void): List<T>

  peekPresent(action: (value: T) => void): List<T>

  peekPresent(action: (value: T, index: number) => void): List<T>

  peekPresent(
    action: (value: T, index: number, arr: List<T>) => void
  ): List<T>

  forEach(action: (value: T) => void): List<T>

  forEach(action: (value: T, index: number) => void): List<T>

  forEach(action: (value: T, index: number, arr: List<T>) => void): List<T>

  map<U>(action: (value: T) => U): List<U>

  map<U>(action: (value: T, index: number) => U): List<U>

  map<U>(action: (value: T, index: number, arr: List<T>) => U): List<U>

  mapDefined<U>(action: (value: T) => U | undefined): List<U>

  mapDefined<U>(action: (value: T, index: number) => U | undefined): List<U>

  mapDefined<U>(
    action: (value: T, index: number, arr: List<T>) => U | undefined
  ): List<U>

  mapUndefined<U>(action: (value: T) => U | T): List<U | T>

  mapUndefined<U>(action: (value: T, index: number) => U | T): List<U | T>

  mapUndefined<U>(
    action: (value: T, index: number, array: List<T>) => U | T
  ): List<U | T>

  flat<U>(depth?: number): List<U>

  flatMap<U>(
    action: (value: T) => List<U> | Array<U>,
    depth?: number
  ): List<U>

  flatMap<U>(
    action: (value: T, index: number) => List<U> | Array<U>,
    depth?: number
  ): List<U>

  flatMap<U>(
    action: (value: T, index: number, arr: List<T>) => List<U> | Array<U>,
    depth?: number
  ): List<U>

  filterClass<U extends T>(type: ClassType<U>): List<U>

  filter(predicate: (value: T) => boolean): List<T>

  filter(predicate: (value: T, index: number) => boolean): List<T>

  filter(
    predicate: (value: T, index: number, array: List<T>) => boolean
  ): List<T>

  filterPresent(): List<NonNullable<T>>

  filterNotPresent(): List<undefined | null>

  every(predicate: (value: T) => boolean): boolean

  every(predicate: (value: T, index: number) => boolean): boolean

  every(predicate: (value: T, index: number, array: List<T>) => boolean): boolean

  some(predicate: (value: T) => boolean): boolean

  some(predicate: (value: T, index: number) => boolean): boolean

  some(predicate: (value: T, index: number, array: List<T>) => boolean): boolean

  none(predicate: (value: T) => boolean): boolean

  none(predicate: (value: T, index: number) => boolean): boolean

  none(predicate: (value: T, index: number, array: List<T>) => boolean): boolean

  findOrThrow(predicate: (value: T) => boolean, exception: () => Error): T

  findOrThrow(predicate: (value: T, index: number) => boolean, exception: () => Error): T

  findOrThrow(
    predicate: (value: T, index: number, array: List<T>) => boolean,
    exception: () => Error
  ): T

  find(predicate: (value: T) => boolean): T | undefined

  find(predicate: (value: T, index: number) => boolean): T | undefined

  find(
    predicate: (value: T, index: number, array: List<T>) => boolean
  ): T | undefined

  findOptional(predicate: (value: T) => boolean): Optional<T>

  findOptional(predicate: (value: T, index: number) => boolean): Optional<T>

  findOptional(
    predicate: (value: T, index: number, array: List<T>) => boolean
  ): Optional<T>

  findIndex(predicate: (value: T) => boolean): number

  findIndex(predicate: (value: T, index: number) => boolean): number

  findIndex(
    predicate: (value: T, index: number, array: List<T>) => boolean
  ): number

  findFirst(): Optional<T>

  findLast(): Optional<T>

  count(predicate: (value: T) => boolean): number

  count(predicate: (value: T, index: number) => boolean): number

  count(predicate: (value: T, index: number, array: List<T>) => boolean): number

  size(): number

  isEmpty(): boolean

  unique(equalityPredicate?: (a: T, b: T) => boolean): List<T>

  toDict<K extends DictKeyType>(): Dict<K, T>

  equals<O>(
    other: Array<O | T> | List<O | T>,
    equalityPredicate?: (a: O | T, b: O | T) => boolean
  ): boolean

  log(identifier?: string | number): List<T>

  log(identifier?: string | number, entryFormatter?: (entry: T) => string): List<T>
}
