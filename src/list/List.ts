import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../exceptions"
import {Collectable} from "../Collectable"
import {Optional} from "@damntools.fr/optional"
import {ClassType, ObjectUtils} from "@damntools.fr/utils-simple"

export class List<T> implements Collectable<T> {
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

  push(...items: Array<T | undefined>): Collectable<T> {
    this.array.push(...items)
    return this
  }

  pushFirst(...items: Array<T | undefined>): Collectable<T> {
    return new List<T>([].concat(items, this.array))
  }

  concat(...items: Array<Array<T> | Collectable<T>>): Collectable<T> {
    let container: Array<Array<T>> = []
    if (items && ObjectUtils.containsMethod(items, "size"))
      container = items.map(i => i as Collectable<T>).map(i => i.collect())
    else if (items && ObjectUtils.containsProperty(items, "length"))
      container = items.map(i => i as Array<T>)
    return new List<T>(this.array.concat(...container))
  }

  reduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: Collectable<T>
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduce(
      (p, c, i, a) => callbackFn(p, c, i, List.from(a)),
      initialValue
    )
  }

  reduceRight<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: Collectable<T>
    ) => U,
    initialValue: U
  ): U {
    return this.array.reduceRight(
      (p, c, i, a) => callbackFn(p, c, i, List.from(a)),
      initialValue
    )
  }

  reverse(): Collectable<T> {
    this.array.reverse()
    return this
  }

  sort(compareFn?: (a: T, b: T) => number): Collectable<T> {
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

  shift(): Collectable<T> {
    this.array.shift()
    return this
  }

  unshift(...items: Array<T>): Collectable<T> {
    this.array.unshift(...items)
    return this
  }

  pop(): Collectable<T> {
    this.array.pop()
    return this
  }

  collect(): Array<T> {
    return this.array
  }

  slice(start: number, end: number): Collectable<T> {
    return new List<T>(this.array.slice(start, end))
  }

  splice(start: number, deleteCount?: number, ...items: T[]): Collectable<T> {
    this.array.splice(start, deleteCount, ...items)
    return this
  }

  peek(
    action: (value: T, index?: number, array?: Collectable<T>) => void
  ): Collectable<T> {
    return new List<T>(
      this.array.map((value, index, arr) => {
        action(value, index, List.from(arr))
        return value
      })
    )
  }

  peekPresent(
    action: (value: T, index?: number, arr?: Collectable<T>) => void
  ): Collectable<T> {
    return new List<T>(
      this.array.map((value, index, arr) => {
        if (value) action(value, index, List.from(arr))
        return value
      })
    )
  }

  forEach(
    action: (value: T, index?: number, arr?: Collectable<T>) => void
  ): Collectable<T> {
    this.array.forEach((value, index, arr) => action(value, index, List.from(arr)))
    return this
  }

  map<U>(action: (value: T, index?: number, arr?: Collectable<T>) => U): Collectable<U> {
    return new List<U>(
      this.array.map((value, index, arr) => action(value, index, List.from(arr)))
    )
  }

  mapDefined<U>(
    action: (value: T, index?: number, arr?: Collectable<T>) => U
  ): Collectable<U> {
    return new List<U>(
      this.array.map((value, index, arr) =>
        value !== undefined && value !== null
          ? action(value, index, List.from(arr))
          : undefined
      )
    )
  }

  mapUndefined<U>(
    action: (value: T, index?: number, array?: Collectable<T>) => U
  ): Collectable<U | T> {
    return new List<U | T>(
      this.array.map((value, index, arr) =>
        value === undefined || value === null
          ? action(value, index, List.from(arr))
          : value
      )
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  flat<U>(depth?: number, castType?: ClassType<U>): Collectable<U> {
    return new List<U>(
      this.array
        .map(item => {
          if (item instanceof List) return item.collect()
          return item
        })
        .flat(depth)
    )
  }

  flatMap<U>(
    action: (value: T, index?: number, arr?: Collectable<T>) => List<U> | Array<U>,
    depth?: number,
    castType?: ClassType<U>
  ): Collectable<U> {
    return this.map(action).flat(depth, castType)
  }

  filterClass<U extends T>(type: ClassType<U>): Collectable<U> {
    return this.filter(value => value instanceof type).map(value => value as U)
  }

  filter(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): Collectable<T> {
    return new List<T>(this.array.filter((v, i, a) => predicate(v, i, List.from(a))))
  }

  filterPresent(): Collectable<NonNullable<T>> {
    return new List<T>(this.array.filter(e => e !== undefined && e !== null))
  }

  filterNotPresent(): Collectable<undefined | null> {
    return new List(this.array.filter(e => e === undefined || e === null))
  }

  every(predicate: (value: T, index: number, array: Collectable<T>) => boolean): boolean {
    return this.array.every((v, i, a) => predicate(v, i, List.from(a)))
  }

  some(predicate: (value: T, index: number, array: Collectable<T>) => boolean): boolean {
    return this.array.some((v, i, a) => predicate(v, i, List.from(a)))
  }

  none(predicate: (value: T, index: number, array: Collectable<T>) => boolean): boolean {
    return !this.every(predicate)
  }

  findOrThrow(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean,
    exception: () => Error
  ): T {
    const found = this.array.find((v, i, a) => predicate(v, i, List.from(a)))
    if (found !== undefined) return found
    throw exception()
  }

  find(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): T | undefined {
    return this.array.find((v, i, a) => predicate(v, i, List.from(a)))
  }

  findIndex(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
  ): number {
    return this.array.findIndex((v, i, a) => predicate(v, i, List.from(a)))
  }

  findOptional(
    predicate: (value: T, index: number, array: Collectable<T>) => boolean
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

  count(predicate: (value: T, index: number, array: Collectable<T>) => boolean): number {
    return this.array.filter((v, i, a) => predicate(v, i, List.from(a))).length
  }

  size(): number {
    return this.array.length
  }

  isEmpty(): boolean {
    return this.size() <= 0
  }

  unique(equalityPredicate?: (a: T, b: T) => boolean): Collectable<T> {
    const predicate = equalityPredicate || ObjectUtils.equals
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
    const predicate = equalityPredicate || ObjectUtils.equals
    const otherArray = Array.isArray(other) ? other : other.collect()
    return this.array.every((value, index) => {
      return predicate(value, otherArray[index])
    })
  }

  static of<T>(...items: Array<T | undefined>): Collectable<T> {
    const list = new List<T>()
    list.push(...items)
    return list
  }

  static from<T>(array: Array<T>): Collectable<T> {
    if (Array.isArray(array)) return new List(array)
    else throw new InvalidArrayError()
  }

  static empty<T>(): Collectable<T> {
    return new List<T>()
  }

  static range(start: number, end: number): Collectable<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new List<number>(range)
  }

  log(
    identifier?: string | number,
    entryFormatter?: (entry: T, index: number, array: Collectable<T>) => string
  ): Collectable<T> {
    const id = identifier || "ListLog"
    if (this.isEmpty()) console.debug(id, "Empty")
    else if (entryFormatter)
      console.debug(
        id,
        this.array.map((e, i, a) => entryFormatter(e, i, List.from(a)))
      )
    else console.debug(id, this.array)
    return this
  }
}
