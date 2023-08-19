import {asNumber, isNumber, List} from "../../core"
import {ArrayList} from "../../list"

export abstract class Collectors {
  /**
   * Can be used to collect array in a List
   * @param items
   */
  static toList<T>(items: Array<T>): List<T> {
    return new ArrayList(items)
  }

  /**
   * Can be used to collect stream into array
   * @param items
   */
  static toArray<T>(items: Array<T>): Array<T> {
    return [].concat(items)
  }

  static min<T>(items: Array<T>): number {
    return Math.min(...items.filter(isNumber).map(asNumber))
  }

  static max<T>(items: Array<T>): number {
    return Math.max(...items.filter(isNumber).map(asNumber))
  }
}

export const toList = Collectors.toList
export const toArray = Collectors.toArray
export const collectMin = Collectors.min
export const collectMax = Collectors.max
