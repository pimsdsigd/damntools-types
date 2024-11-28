import {copyArrayInstance, isNumber, List, StreamCollector} from "../../core"
import {ArrayList, UniqueList} from "../../list"
import {Tuple2, Tuples} from "../Tuples"

export type JoiningSeparatorFn<T, S> = (e: T, i: number) => S

export abstract class Collectors {
  /**
   * Can be used to collect array in a List
   * @param items
   */
  static toList<T>(items: Array<T>): List<T> {
    return new ArrayList(items)
  }

  /**
   * Can be used to collect array in a UniqueList
   * @param items
   */
  static toSet<T>(items: Array<T>): List<T> {
    return new UniqueList(items)
  }

  /**
   * Can be used to collect array in a String
   * @param items
   */
  static toString<T>(items: Array<T>): string {
    return items.join()
  }

  /**
   * Can be used to collect stream into array
   * @param items
   */
  static toArray<T>(items: Array<T>): Array<T> {
    return copyArrayInstance(items)
  }

  static min(items: Array<number>): number {
    return Math.min(...items.filter(isNumber))
  }

  static max(items: Array<number>): number {
    return Math.max(...items.filter(isNumber))
  }

  static minMax(items: Array<number>): Tuple2<number, number> {
    let min = Number.MAX_VALUE,
      max = Number.MIN_VALUE
    items.forEach(item => {
      if (item < min) min = item
      if (item > max) max = item
    })
    return Tuples.duo(min, max)
  }

  static joining<T, S>(
    separator: S | JoiningSeparatorFn<T, S>
  ): StreamCollector<T, List<T | S>> {
    const isFunction = typeof separator === "function"
    return (items: Array<T>) => {
      const size = items.length
      const res = new ArrayList<T | S>()
      for (let i = 0; i < size; i++) {
        res.push(items[i])
        if (i < size - 1) {
          if (isFunction) {
            res.push((separator as JoiningSeparatorFn<T, S>)(items[i], i))
          } else res.push(separator as S)
        }
      }
      return res
    }
  }
}

export const toList = Collectors.toList
export const toSet = Collectors.toSet
export const toArray = Collectors.toArray
export const collectMin = Collectors.min
export const collectMax = Collectors.max
export const collectMinMax = Collectors.minMax
