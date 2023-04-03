import {Optional} from "@damntools.fr/optional";
import {ClassType} from "@damntools.fr/utils-simple";

export interface Collectable<T> {
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
  push(...items: Array<T>): Collectable<T>

  /**
   * Add elements from every array items to the current instance and returns the instance
   * @param items
   */
  concat(...items: Array<Array<T>>): Collectable<T>

  /**
   * Reduce the array and collect the reduced value
   * @param callbackFn
   * @param initialValue
   */
  reduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex?: number,
      array?: T[]
    ) => U,
    initialValue: U
  ): U

  /**
   * Reduce the array starting from last item to first and collect the value
   * @param callbackFn
   * @param initialValue
   */
  reduceRight<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex?: number,
      array?: T[]
    ) => U,
    initialValue: U
  ): U

  reverse(): Collectable<T>

  sort(compareFn?: (a: T, b: T) => number): Collectable<T>

  join(separator?: string): string

  first(): T | undefined

  last(): T | undefined

  shift(): Collectable<T>

  unshift(...items: Array<T>): Collectable<T>

  pop(): Collectable<T>

  collect(): Array<T>

  slice(start: number, end: number): Collectable<T>

  splice(start: number, deleteCount?: number, ...items: T[]): Collectable<T>

  peek(
    action: (value: T) => void
  ): Collectable<T>

  peek(
    action: (value: T, index: number) => void
  ): Collectable<T>

  peek(
    action: (value: T, index: number, array: Collectable<T>) => void
  ): Collectable<T>

  peekPresent(
    action: (value: T) => void
  ): Collectable<T>

  peekPresent(
    action: (value: T, index: number) => void
  ): Collectable<T>

  peekPresent(
    action: (value: T, index: number, arr: Collectable<T>) => void
  ): Collectable<T>

  forEach(
    action: (value: T) => void
  ): Collectable<T>

  forEach(
    action: (value: T, index: number) => void
  ): Collectable<T>

  forEach(
    action: (value: T, index: number, arr: Collectable<T>) => void
  ): Collectable<T>

  map<U>(
    action: (value: T) => U
  ): Collectable<U>

  map<U>(
    action: (value: T, index: number) => U
  ): Collectable<U>

  map<U>(
    action: (value: T, index: number, arr: Collectable<T>) => U
  ): Collectable<U>

  mapDefined<U>(
    action: (value: T) => U | undefined
  ): Collectable<U>

  mapDefined<U>(
    action: (value: T, index: number) => U | undefined
  ): Collectable<U>

  mapDefined<U>(
    action: (value: T, index: number, arr: Collectable<T>) => U | undefined
  ): Collectable<U>

  mapUndefined<U>(
    action: (value: T) => U | T
  ): Collectable<U | T>

  mapUndefined<U>(
    action: (value: T, index: number) => U | T
  ): Collectable<U | T>

  mapUndefined<U>(
    action: (value: T, index: number, array: Collectable<T>) => U | T
  ): Collectable<U | T>

  flat<U>(depth?: number, castType?: ClassType<U>): Collectable<U>

  flatMap<U>(
    action: (
      value: T,
    ) => Collectable<U> | Array<U>,
    depth?: number,
    castType?: ClassType<U>
  ): Collectable<U>

  flatMap<U>(
    action: (
      value: T,
      index: number
    ) => Collectable<U> | Array<U>,
    depth?: number,
    castType?: ClassType<U>
  ): Collectable<U>

  flatMap<U>(
    action: (
      value: T,
      index: number,
      arr: Collectable<T>
    ) => Collectable<U> | Array<U>,
    depth?: number,
    castType?: ClassType<U>
  ): Collectable<U>

  filter(
    predicate: (value: T) => boolean
  ): Collectable<T>

  filter(
    predicate: (value: T, index: number) => boolean
  ): Collectable<T>

  filter(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): Collectable<T>

  filterPresent(): Collectable<T>

  filterNotPresent(): Collectable<T>

  every(
    predicate: (value: T) => boolean
  ): boolean

  every(
    predicate: (value: T, index: number) => boolean
  ): boolean

  every(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): boolean

  some(
    predicate: (value: T) => boolean
  ): boolean

  some(
    predicate: (value: T, index: number) => boolean
  ): boolean

  some(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): boolean

  none(
    predicate: (value: T) => boolean
  ): boolean

  none(
    predicate: (value: T, index: number) => boolean
  ): boolean

  none(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): boolean

  findOrThrow(
    predicate: (value: T) => boolean,
    exception: () => Error
  ): T

  findOrThrow(
    predicate: (value: T, index: number) => boolean,
    exception: () => Error
  ): T

  findOrThrow(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean,
    exception: () => Error
  ): T

  find(
    predicate: (value: T) => boolean
  ): T | undefined

  find(
    predicate: (value: T, index: number) => boolean
  ): T | undefined

  find(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): T | undefined

  findOptional(
    predicate: (value: T) => boolean
  ): Optional<T>

  findOptional(
    predicate: (value: T, index: number) => boolean
  ): Optional<T>

  findOptional(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): Optional<T>

  findIndex(
    predicate: (value: T) => boolean
  ): number

  findIndex(
    predicate: (value: T, index: number) => boolean
  ): number

  findIndex(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): number

  count(
    predicate: (value: T) => boolean
  ): number

  count(
    predicate: (value: T, index: number) => boolean
  ): number

  count(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): number

  size(): number

  isEmpty(): boolean

  unique(equalityPredicate: (a: T, b: T) => boolean): Collectable<T>

  equals<O>(
    other: Array<O | T> | Collectable<O | T>,
    equalityPredicate: (a: O | T, b: O | T) => boolean
  ): boolean
}
