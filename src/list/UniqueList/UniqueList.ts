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
  defined,
  EqualityPredicate,
  equals,
  isList,
  List
} from "../../core"
import {ArrayList} from "../ArrayList"

const prepareIndex = (index: number, length: number) => {
  if (!index && index !== 0) throw new InvalidIndexError()
  if (index < 0) index = length + index
  if (index < 0 || index >= length) throw new IndexOutOfBoundError(index, length)
  return index
}

export class UniqueList<T> extends ArrayList<T> implements List<T> {
  protected array: Array<T>
  protected equalityPredicate?: EqualityPredicate<T, T>
  protected readonly capacity: number
  protected _size: number

  /**
   * Will store same array instance if parameter type is Array
   * If it is a List, then the array is copied into another instance
   */
  public constructor(
    array?: AbstractedArray<T>,
    equalityPredicate?: EqualityPredicate<T, T>,
    capacity?: number
  ) {
    super(undefined, capacity)
    if (array) {
      if (isList(array))
        this.array = array.stream().unique(equalityPredicate).collectArray()
      else if (Array.isArray(array))
        this.array = new ArrayList(array)
          .stream()
          .unique(equalityPredicate)
          .collectArray()
      else throw new InvalidArrayError()
    } else {
      this.array = []
    }
    this.equalityPredicate = equalityPredicate || equals
    this._size = this.array.length
  }

  insert(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item => !this.array.find(i => this.equalityPredicate(i, item)))
    return super.insert(start, array)
  }

  replace(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item => !this.array.find(i => this.equalityPredicate(i, item)))
    return super.replace(start, array)
  }

  replaceFrom(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item => !this.array.find(i => this.equalityPredicate(i, item)))
    return super.replaceFrom(start, array)
  }

  push(...items: Array<T | undefined>): this {
    items = items.filter(item => !this.array.find(i => this.equalityPredicate(i, item)))
    return super.push(...items)
  }

  concat(...items: ConcatArgType<T>): this {
    if (items) {
      const container: Array<Array<T>> = items.filter(defined).map(abstractArrayToArray)
      const totalLength = container
        .map(value => value.length)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
      if (totalLength > this.capacity - this.size())
        throw new ListMaxCapacityCrossedError(this.capacity, this.size(), totalLength)
      let array = this.array
      container.forEach(
        c =>
          (array = concatArray(
            array,
            c.filter(item => !this.array.find(i => this.equalityPredicate(i, item)))
          ))
      )
      this.array = array
      this._size = this.array.length
    }
    return this
  }

}
