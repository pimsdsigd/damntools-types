import {AbstractedArray, isList, List} from "../../core"
import {
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../../exceptions"
import {ArrayList, StaticArrayList} from "../../list"

export abstract class Lists {
  private static EMPTY_ARRAY_LIST = new StaticArrayList([])

  /**
   * Returns static list containing numbers between range
   */
  static range(start: number, end: number): List<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new StaticArrayList(range)
  }

  /**
   * Returns modifiable list created from elements passed as parameters
   */
  static of<T>(...items: Array<T | undefined>): List<T> {
    return new ArrayList<T>(items)
  }

  /**
   * Returns static list created from elements passed as parameters
   */
  static unmodifiable<T>(...items: Array<T | undefined>): List<T> {
    return new StaticArrayList<T>(items)
  }

  /**
   * Returns static list created from the elements of the array passed as parameter
   */
  static from<T>(array: NonNullable<AbstractedArray<T>>): List<T> {
    if (!array) throw new InvalidArrayError("Array should be provided !")
    return new StaticArrayList(array)
  }

  /**
   * Returns empty static list (same instance, but unmodifiable)
   */
  static empty<T>(): List<T> {
    return Lists.EMPTY_ARRAY_LIST
  }

  /**
   * Returns static list containing one element passed as parameter
   * @param item
   */
  static singleton<T>(item: NonNullable<T>): List<T> {
    return new StaticArrayList<T>([item])
  }

  static sub<T>(list: List<T>, start: number, end?: number): List<T> {
    if (start >= list.size()) {
      return new ArrayList()
    }
    end = typeof end === "undefined" ? list.size() : end
    end = Math.min(end, list.size())
    if (start >= end) {
      return new ArrayList()
    }
    return list.copy().sub(start, end)
  }

  static lengthSub<T>(list: List<T>, start: number, length: number): List<T> {
    if (start >= list.size() || length ===0) {
      return new ArrayList()
    }
    length = Math.min(length, list.size() - start)
    length = start + length
    return list.copy().sub(start, length)
  }

  static isEmpty<T extends List<any> | Array<any>>(list: T | undefined): boolean {
    if( !list)return false
    if( Array.isArray(list)) return list.length === 0
    if( isList(list)) return list.isEmpty()
    throw Error("Not an array or a list or undefined")
  }

  static hasElements<T extends List<any> | Array<any>>(list: T | undefined): list is T {
    return !this.isEmpty(list)
  }
}
