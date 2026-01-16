import {
  containsMethod,
  containsProperty,
  Dict,
  DictObjectEntry,
  isDict,
  isList,
  List,
  Optionable
} from "../core"
import {ArrayList, StaticArrayList} from "../list"
import {Enum} from "../enum"
import {isOptional} from "../optional"
import {KV} from "../dict"
import {DictUtils} from "./DictUtils"

export type SimplifyAllowedObjects =
  | List<any>
  | Dict<string, any>
  | Array<any>
  | Enum<any>
  | Optionable<any>
  | {[key: string]: any}

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

  static keys<T>(obj: T): List<keyof T> {
    return new StaticArrayList(Object.keys(obj) as Array<keyof T>)
  }

  static values<T>(obj: object): List<T> {
    return new StaticArrayList(Object.values(obj))
  }

  static sortEntries(obj: object): List<any> {
    return new ArrayList(Object.entries(obj).sort(this.entrySorter))
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
            steps.slice(1).join(separator),
            value,
            separator
          )
        }
      } else if (steps.length > 1) {
        obj[current] = {}
        ObjectUtils.pathModifier(
          obj[current],
          steps.slice(1).join(separator),
          value,
          separator
        )
      } else if (steps.length === 1) {
        obj[current] = value
      }
    }
  }

  static simplify<T>(obj: SimplifyAllowedObjects): T {
    if (isList(obj)) {
      return obj.copy().getInner() as T
    } else if (isOptional(obj)) {
      return obj.orElseUndefined() as T
    } else if (isDict(obj)) {
      return obj.collect() as T
    } else if (obj instanceof Enum) {
      return obj.key() as T
    } else {
      return obj as T
    }
  }

  static simplifyDeeply<T>(obj: SimplifyAllowedObjects): T {
    if (isList(obj)) {
      return obj.stream().map(ObjectUtils.simplifyDeeply).collectArray() as T
    } else if (isOptional(obj)) {
      return ObjectUtils.simplifyDeeply(obj.orElseUndefined()) as T
    } else if (isDict(obj)) {
      return DictUtils.fromEntries(
        obj
          .entries()
          .stream()
          .map(e => {
            return {
              ...e,
              value: ObjectUtils.simplifyDeeply(e.value)
            } as DictObjectEntry<any, any>
          })
          .collect(items => new ArrayList(items))
      ).collect() as T
    } else if (obj instanceof Enum) {
      return obj.key() as T
    } else if (Array.isArray(obj)) {
      return obj.map(ObjectUtils.simplifyDeeply) as T
    } else if (typeof obj === "object") {
      return ObjectUtils.simplifyDeeply(KV.from(obj))
    } else {
      return obj
    }
  }

  static flatten<T extends object>(obj: T): object {
    const flat = {} as any
    Object.keys(obj).forEach((key: string) => {
      if (!obj[key] || isList(obj[key]) || Array.isArray(obj[key])) {
        flat[key] = obj[key]
        return
      }
      switch (typeof obj[key]) {
        case "number":
        case "string":
        case "function":
        case "boolean": {
          flat[key] = obj[key]
          break
        }
        case "object": {
          const flattened = this.flatten(
            isDict(obj[key]) ? (obj[key] as Dict<any, any>).collect() : obj[key]
          )
          Object.entries(flattened).forEach(([subKey, subValue]) => {
            flat[`${key}.${subKey}`] = subValue
          })
          break
        }
      }
    })
    return flat
  }

  static mergeDeeply<T extends object>(a: T, b: T): T {
    const flattened = this.flatten(a)
    const unsetKey = "<<<UNSET>>>"
    Object.keys(flattened).forEach((key: string) => {
      const bVal = this.pathAccessor(b, key, unsetKey)
      if (bVal !== unsetKey) {
        this.pathModifier(a, key, bVal)
      }
    })
    return a as T
  }
}

ObjectUtils.simplify(new ArrayList([51]))
ObjectUtils.simplify([12])
