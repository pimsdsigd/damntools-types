import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../exceptions"
import {AbstractedArray, ConcatArgType, List, PeekFunction, SortFunction} from "./List"
import {Optional} from "../optional"
import {Stream} from "./Stream"
import {ListStream} from "./ListStream"

export const concatMapFn = i => {
  if (i instanceof ArrayList) return i.getInner()
  else if (Array.isArray(i)) return i
  return []
}

export const peekFn = action => (value, index, arr) => {
  if (value) action(value, index, ArrayList.from(arr))
}

export class ArrayList<T> implements List<T> {
  private array: Array<T>

  private constructor(array?: Array<T> | any) {
    if (!!array && !Array.isArray(array)) throw new InvalidArrayError()
    this.array = [].concat(array) || []
  }

  copy(): List<T> {
    return new ArrayList(this.array)
  }

  stream(): Stream<T> {
    return ListStream.of(this.array)
  }

  getInner(): Array<T> {
    return [].concat(this.array)
  }

  insert(start: number, deleteCount?: number, items?: AbstractedArray<T>): this {
    start = Math.max(start, this.array.length - 1)
    const aItems = Array.isArray(items) ? items : items.getInner()
    this.array.splice(start, 0, ...aItems)
    return this
  }

  remove(index: number): this {
    this.array.splice(index, 1)
    return this
  }

  sub(start: number, end?: number): List<T> {
    return new ArrayList(this.array.slice(start, end))
  }

  get(index: number): T | undefined {
    if (!index && index !== 0) throw new InvalidIndexError()
    if (index < 0 || index >= this.array.length)
      throw new IndexOutOfBoundError(index, this.array.length)
    return this.array[index]
  }

  getOptional(index: number): Optional<T> {
    return Optional.nullable(this.get(index))
  }

  indexOf(value: T): Optional<number> {
    const index = this.array.indexOf(value)
    return index === -1 ? Optional.empty() : Optional.of(index)
  }

  first(): T | undefined {
    if (this.size() > 0) return this.get(0)
    return undefined
  }

  last() {
    if (this.size() > 0) return this.get(-1)
    return undefined
  }

  push(...items: Array<T | undefined>): this {
    this.array.push(...items)
    return this
  }

  concat(...items: ConcatArgType<T>): this {
    const container: Array<Array<T>> = items.map(concatMapFn)
    this.array = this.array.concat(...container)
    return this
  }

  reverse(): this {
    this.array.reverse()
    return this
  }

  sort(compareFn?: SortFunction<T>): this {
    this.array.sort(compareFn)
    return this
  }

  forEach(action: PeekFunction<T>): this {
    this.array.forEach(peekFn(action))
    return this
  }

  size(): number {
    return this.array.length
  }

  isEmpty(): boolean {
    return this.size() <= 0
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
    return new ArrayList<T>([])
  }

  static range(start: number, end: number): List<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new ArrayList<number>(range)
  }

  hasElements(): boolean {
    return !this.isEmpty()
  }

  clear(): void {
    this.array = []
  }
}
