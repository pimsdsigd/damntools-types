import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  ListMaxCapacityCrossedError
} from "../../exceptions"
import {
  abstractArrayToArray,
  AbstractedArray,
  Comparator,
  compare,
  ConcatArgType,
  concatArray,
  copyArrayInstance,
  defined,
  isList,
  List,
  Optionable,
  Stream
} from "../../core"
import {Optional} from "../../optional"
import {ListStream} from "../../stream"

const prepareIndex = (index: number, length: number) => {
  if (!index && index !== 0) throw new InvalidIndexError()
  if (index < 0) index = length + index
  if (index < 0 || index >= length) throw new IndexOutOfBoundError(index, length)
  return index
}

export class ArrayList<T> implements List<T> {
  protected array: Array<T>
  protected readonly capacity: number
  protected _size: number
  private readonly __iamList = true

  /**
   * Will store same array instance if parameter type is Array
   * If it is a List, then the array is copied into another instance
   */
  public constructor(array?: AbstractedArray<T>, capacity?: number) {
    if (array) {
      if (isList(array)) {
        this.array = array.getInner()
      } else if (Array.isArray(array)) {
        this.array = array
      } else {
        throw new InvalidArrayError()
      }
    } else {
      this.array = []
    }
    this.capacity = capacity && capacity >= 0 ? capacity : Number.MAX_VALUE
    this._size = this.array.length
  }

  copy(): List<T> {
    return new ArrayList(this)
  }

  stream(): Stream<T> {
    return new ListStream(this.array)
  }

  getInner(): Array<T> {
    return copyArrayInstance(this.array)
  }

  forEach(action: (value: T, index: number, array: Array<T>) => void): this {
    for (let i = 0; i < this.array.length; i++) {
      const v = this.array[i]
      if (!!v || v === 0 || v === false || v === "") action(v, i, this.array)
    }
    return this
  }

  size(): number {
    return this._size
  }

  isEmpty(): boolean {
    return this.size() <= 0
  }

  hasElements(): boolean {
    return !this.isEmpty()
  }

  get(index: number): T | undefined {
    index = prepareIndex(index, this.array.length)
    return this.array[index]
  }

  getOptional(index: number): Optionable<T> {
    try {
      return Optional.nullable(this.get(index))
    } catch (e) {
      return Optional.empty()
    }
  }

  includes(item: T): boolean {
    return this.array.includes(item)
  }

  indexOf(value: T): Optionable<number> {
    const index = this.array.indexOf(value)
    return index === -1 ? Optional.empty() : Optional.of(index)
  }

  first(): Optionable<T> {
    if (this.size() > 0) return this.getOptional(0)
    return Optional.empty()
  }

  last(): Optionable<T> {
    if (this.size() > 0) return this.getOptional(-1)
    return Optional.empty()
  }

  clear(): this {
    this.array = []
    this._size = this.array.length
    return this
  }

  remove(index: number): this {
    index = prepareIndex(index, this.array.length)
    if (this.hasElements()) this.array.splice(index, 1)
    this._size = this._size - 1
    return this
  }

  delete(start: number, end?: number): this {
    start = prepareIndex(start, this.array.length)
    if (defined(end)) {
      if (end < start) throw new InvalidIndexError("End cannot be before start !")
      this.array.splice(start, end - start)
    } else {
      this.array.splice(start)
    }
    this._size = this.array.length
    return this
  }

  sub(start: number, end?: number): this {
    start = prepareIndex(start, this.array.length)
    if (defined(end)) {
      if (end < start) throw new InvalidIndexError("End cannot be before start !")
      this.array = this.array.slice(start, end)
    } else {
      this.array = this.array.slice(start)
    }
    this._size = this.array.length
    return this
  }

  insert(start: number, items?: AbstractedArray<T>): this {
    start = prepareIndex(start, this.array.length)
    const array = abstractArrayToArray(items)
    if (array.length > this.capacity - this.size())
      throw new ListMaxCapacityCrossedError(this.capacity, this.size(), array.length)
    this.array.splice(start, 0, ...array)
    this._size = this.array.length
    return this
  }

  replace(start: number, items?: AbstractedArray<T>): this {
    start = prepareIndex(start, this.array.length)
    const array = abstractArrayToArray(items)
    if (array.length - 1 > this.capacity - this.size())
      throw new ListMaxCapacityCrossedError(this.capacity, this.size(), array.length)
    this.array.splice(start, 1, ...array)
    this._size = this.array.length
    return this
  }

  replaceFrom(start: number, items?: AbstractedArray<T>): this {
    start = prepareIndex(start, this.array.length)
    const array = abstractArrayToArray(items)
    if (array.length > this.capacity - this.size())
      throw new ListMaxCapacityCrossedError(this.capacity, this.size(), array.length)
    this.array.splice(start, array.length, ...array)
    this._size = this.array.length
    return this
  }

  push(...items: Array<T | undefined>): this {
    if (items.length > this.capacity - this.size())
      throw new ListMaxCapacityCrossedError(this.capacity, this.size(), items.length)
    this.array.push(...items)
    this._size = this.array.length
    return this
  }

  concat(...items: ConcatArgType<T>): this {
    if (items) {
      const container: Array<Array<T>> = this.getConcatArgs(...items)
      container.forEach(c => (this.array = concatArray(this.array, c)))
      this._size = this.array.length
    }
    return this
  }

  sort(compareFn: Comparator<T>): this {
    if (this.hasElements()) this.array.sort(compareFn)
    return this
  }

  sortWith(key: keyof T): this {
    if (this.hasElements()) this.array.sort((a, b) => compare(a[key], b[key]))
    return this
  }

  reverse(): this {
    if (this.hasElements()) this.array.reverse()
    return this
  }

  double(): this {
    if (this.isEmpty()) return this
    return this.concat(this)
  }

  protected getConcatArgs(...args: ConcatArgType<T>) {
    const container: Array<Array<T>> = args.filter(defined).map(abstractArrayToArray)
    const totalLength = container
      .map(value => value.length)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    if (totalLength > this.capacity - this.size())
      throw new ListMaxCapacityCrossedError(this.capacity, this.size(), totalLength)
    return container
  }
}
