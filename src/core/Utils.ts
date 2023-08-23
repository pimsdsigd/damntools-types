import {InvalidArrayError, UndefinedError} from "../exceptions"
import {AbstractedArray, List} from "./List"
import {Comparator} from "./Comparator"
import {Optionable} from "./Optionable"

export const containsProperty = (obj: object, propertyName: string): boolean=> {
  return obj && Object.prototype.hasOwnProperty.call(obj, propertyName)
}

export const containsMethod = (obj: object, methodName: string): boolean => {
  return containsProperty(obj, methodName) && typeof obj[methodName] === "function"
}

export const containsPrototypeMethod = (obj: object, methodName: string): boolean => {
  return (
    !!obj &&
    containsProperty(Object.getPrototypeOf(obj), methodName) &&
    typeof obj[methodName] === "function"
  )
}

export const defined = <T>(variable: T): variable is NonNullable<T> => {
  return !!variable || variable === 0 || variable === false || variable === ""
}

export const notDefined = (variable: any): variable is undefined => !defined(variable)

export const requireDefined = <T>(variable: T, reason?: string): T => {
  if (!!variable || variable === 0 || variable === false || variable === "")
    return variable
  throw new UndefinedError(reason)
}

export const equals = (a: any, b: any): boolean => {
  return !!a && !!a.equals && typeof a.equals === "function" ? !!a.equals(b) : a === b
}

const compareArrayReducer = (a, b) => (old, cur, i) =>
  old === 0 ? compare(a[i], b[i]) : old

const compareObjectReducer = (a, b) => (old, cur) =>
  old === 0 && Object.prototype.hasOwnProperty.call(b, cur)
    ? compare(a[cur], b[cur])
    : old

export const compareObjects: Comparator<object> = (a: object, b: object): number => {
  const aKeys = Object.keys(a)
  const bKeys = Object.keys(b)
  if (aKeys.length === bKeys.length) return aKeys.reduce(compareObjectReducer(a, b), 0)
  return aKeys.length - bKeys.length
}
export const compareArrays: Comparator<Array<any>> = <T>(
  a: Array<T>,
  b: Array<T>
): number => {
  if (a.length === b.length) return a.reduce(compareArrayReducer(a, b), 0)
  return a.length - b.length
}

export const compareNumbers: Comparator<number> = (a: number, b: number): number => {
  return a - b
}

export const compareStrings: Comparator<string> = (a: string, b: string): number => {
  if (notDefined(a) && notDefined(b)) return 0
  if (notDefined(a)) return -1
  if (notDefined(b)) return 1
  return a.localeCompare(b)
}

export const compare: Comparator<any> = (a: any, b: any): number => {
  if (a) {
    if (a === b) return 0
    else if (typeof a.compare === "function") return a.compare(b)
    else if (typeof a === "string" && typeof b === "string") return a.localeCompare(b)
    else if (typeof a === "number" && typeof b === "number") return a - b
    else if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime()
    else if (Array.isArray(a)) return compareArrays(a, b)
    else if (isList(a)) return compareArrays(a.getInner(), b.getInner())
    else if (typeof a === "object" && typeof b === "object") return compareObjects(a, b)
  }
  return -1
}

export const isList = <T>(obj: AbstractedArray<T> | any): obj is List<T> => {
  return defined(obj) && containsPrototypeMethod(obj, "getInner")
}


export const abstractArrayToArray = <T>(obj: AbstractedArray<T>): Array<T> => {
  if (isList(obj)) return (obj as List<T>).getInner()
  else if (Array.isArray(obj)) return obj
  throw new InvalidArrayError("Object is not an Array or a List")
}

export const isNumber = (value: any): value is number => {
  return typeof value === "number"
}
export const asNumber = (value: any): number => {
  return value as number
}

export const isPresent = <T>(value: Optionable<T>): boolean => {
  return defined(value) && value.isPresent()
}

export const copyArrayInstance = <T>(array: Array<T>): Array<T> => {
  const other = []
  for (let i = 0; i < array.length; i++) {
    other[i] = array[i]
  }
  return other
}

export const concatArray = <T>(a1: Array<T>, a2: Array<T>): Array<T> => {
  for (let i = 0; i < a2.length; i++) {
    a1[a1.length + i] = a2[i]
  }
  return a1
}
