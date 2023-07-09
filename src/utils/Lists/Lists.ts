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
   * @param start {number}
   * @param end {number}
   */
  static range(start: number, end: number): List<number> {
    if (!start && start !== 0) throw new InvalidRangeStartError()
    if ((!end && end !== 0) || end < start) throw new InvalidRangeEndError()
    const range = [...Array(end - start).keys()].map(i => i + start)
    return new StaticArrayList(range)
  }

  /**
   * Returns modifiable list created from elements passed as parameters
   * @param items
   */
  static of<T>(...items: Array<T | undefined>): List<T> {
    return new ArrayList<T>(items)
  }

  /**
   * Returns static list created from elements passed as parameters
   * @param items
   */
  static unmodifiable<T>(...items: Array<T | undefined>): List<T> {
    return new StaticArrayList<T>(items)
  }

  /**
   * Returns static list created from the elements of the array passed as parameter
   * @param array
   */
  static from<T>(array: AbstractedArray<T>): List<T> {
    if (Array.isArray(array)) return new StaticArrayList(array)
    if (isList(array)) return new StaticArrayList(array.getInner())
    else throw new InvalidArrayError()
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
  static singleton<T>(item: T): List<T> {
    return new StaticArrayList<T>([item])
  }
}
