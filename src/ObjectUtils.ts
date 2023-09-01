import {Lists} from "./utils"
import {containsMethod, containsProperty, List} from "./core"
import {StaticArrayList} from "./list"

export class ObjectUtils {
  /**
   * Very slow, use carefully
   */
  static cloneObject(obj: object): object {
    return JSON.parse(JSON.stringify(obj))
  }

  static containsProperty(obj: object, propertyName: string): boolean {
    return containsProperty(obj, propertyName)
  }

  static containsMethod(obj: object, methodName: string): boolean {
    return containsMethod(obj, methodName)
  }

  static entries(obj: object): List<[string, any]> {
    return new StaticArrayList(Object.keys(obj).map(key => [key, obj[key]]))
  }

  static fromEntries(entries: List<[string, any]>): object {
    return Object.fromEntries(entries.getInner())
  }

  static keys(obj: object): List<string> {
    return Lists.from(Object.keys(obj))
  }

  static values<T>(obj: object): List<T> {
    return Lists.from(Object.values(obj))
  }

  static sortEntries(obj: object): List<any> {
    return Lists.from(Object.entries(obj).sort(this.entrySorter))
  }

  static entrySorter(a: Array<any>, b: Array<any>): number {
    a = a[0].toUpperCase()
    b = b[0].toUpperCase()
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  static pathAccessor<T>(
    obj: object,
    path: string,
    defaultValue?: T,
    separator?: string
  ) {
    if (!separator) separator = "."
    const steps = path.split(separator)
    if (steps.length > 0) {
      const current = steps[0].replace(/\?$/, "")
      if (ObjectUtils.containsProperty(obj, current)) {
        if (steps.length === 1) return obj[current]
        return ObjectUtils.pathAccessor(
          obj[current],
          steps.slice(1).join("."),
          defaultValue,
          separator
        )
      } else if (defaultValue !== undefined) {
        return defaultValue
      } else return undefined
    }
  }

  static pathModifier(obj: object, path: string, value: any, separator?: string) {
    if (!separator) separator = "."
    const steps = path.split(separator)
    if (steps.length > 0) {
      const current = steps[0].replace(/\?$/, "")
      if (ObjectUtils.containsProperty(obj, current)) {
        if (steps.length === 1) {
          obj[current] = value
        } else {
          ObjectUtils.pathModifier(
            obj[current],
            steps.slice(1).join("."),
            value,
            separator
          )
        }
      }
    }
  }
}
