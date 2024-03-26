import {asNumber, copyArrayInstance, isNumber, List, StreamCollector} from "../../core"
import {ArrayList, UniqueList} from "../../list"

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

  static min<T>(items: Array<T>): number {
    return Math.min(...items.filter(isNumber).map(asNumber))
  }

  static max<T>(items: Array<T>): number {
    return Math.max(...items.filter(isNumber).map(asNumber))
  }

  static joining<T, S>(separator: S): StreamCollector<T, List<T | S>> {
    return (items: Array<T>) => {
      const size = items.length
      const res = new ArrayList<T | S>()
      for (let i = 0; i < size; i++) {
        res.push(items[i])
        if (i < size - 1) {
          res.push(separator)
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
