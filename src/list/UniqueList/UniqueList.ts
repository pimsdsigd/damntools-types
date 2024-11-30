import {InvalidArrayError} from "../../exceptions"
import {
  abstractArrayToArray,
  AbstractedArray,
  ConcatArgType,
  concatArray, defined,
  EqualityPredicate,
  equals,
  isList,
  List
} from "../../core"
import {ArrayList} from "../ArrayList"

export class UniqueList<T> extends ArrayList<T> implements List<T> {
  protected equalityPredicate?: EqualityPredicate<T, T>

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
      if (isList(array)) {
        this.array = array.stream().unique(equalityPredicate).collectArray()
      } else if (Array.isArray(array)) {
        this.array = new ArrayList(array)
          .stream()
          .unique(equalityPredicate)
          .collectArray()
      } else {
        throw new InvalidArrayError()
      }
    } else {
      this.array = []
    }
    this.equalityPredicate = equalityPredicate || equals
    this._size = this.array.length
  }

  insert(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item =>defined(item) && !this.array.find(i => this.equalityPredicate(i, item)))
    return super.insert(start, array)
  }

  replace(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item =>defined(item) && !this.array.find(i => this.equalityPredicate(i, item)))
    return super.replace(start, array)
  }

  replaceFrom(start: number, items?: AbstractedArray<T>): this {
    let array = abstractArrayToArray(items)
    array = array.filter(item => defined(item) &&!this.array.find(i => this.equalityPredicate(i, item)))
    return super.replaceFrom(start, array)
  }

  push(...items: Array<T | undefined>): this {
    items = items.filter(item => defined(item) && !this.array.find(i => this.equalityPredicate(i, item)))
    return super.push(...items)
  }

  concat(...items: ConcatArgType<T>): this {
    if (items) {
      const container: Array<Array<T>> = this.getConcatArgs(...items)
      container.filter(i => defined(i)).forEach(
        c =>
          (this.array = concatArray(
            this.array,
            c.filter(item => defined(item) &&!this.array.find(i => this.equalityPredicate(i, item)))
          ))
      )
      this._size = this.array.length
    }
    return this
  }
}
