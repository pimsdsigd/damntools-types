export type Streamable<T> = {
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
  push(...items: Array<T>): Streamable<T>

  /**
   * Add elements from every array items to the current instance and returns the instance
   * @param items
   */
  concat(...items: Array<Array<T>>): Streamable<T>

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

  reverse(): Streamable<T>

  sort(compareFn?: (a: T, b: T) => number): Streamable<T>

  join(separator?: string): string

  first(): T | undefined

  last(): T | undefined

  shift(): Streamable<T>

  unshift(...items: Array<T>): Streamable<T>

  pop(): Streamable<T>

  collect(): Array<T>

  slice(start: number, end: number): Streamable<T>

  splice(start: number, deleteCount?: number, ...items: T[]): Streamable<T>

  peek(
    action: (value: T, index?: number, array?: Array<T>) => void
  ): Streamable<T>

  peekPresent(
    action: (value: T, index?: number, arr?: Array<T>) => void
  ): Streamable<T>

  forEach(
    action: (value: T, index?: number, arr?: Array<T>) => void
  ): Streamable<T>

  map<U>(action: (value: T, index?: number, arr?: Array<T>) => U): Streamable<U>

  mapDefined<U>(
    action: (value: T, index?: number, arr?: Array<T>) => U | undefined
  ): Streamable<U>

  mapUndefined<U>(
    action: (value: T, index?: number, array?: Array<T>) => U | T
  ): Streamable<U | T>

  flat(depth?: number): Streamable<T>

  filter(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): Streamable<T>

  filterPresent(): Streamable<T>

  filterNotPresent(): Streamable<T>

  every(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean

  some(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean

  none(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): boolean

  findOrThrow(
    predicate: (value: T, index: number, array: Array<T>) => boolean,
    exception: () => Error
  ): T

  find(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): T | undefined

  findIndex(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): number

  count(
    predicate: (value: T, index: number, array: Array<T>) => boolean
  ): number

  size(): number

  unique(equalityPredicate: (a: T, b: T) => boolean): Streamable<T>

  equals<O>(
    other: Array<O | T> | Streamable<O | T>,
    equalityPredicate: (a: O | T, b: O | T) => boolean
  ): boolean
}
