import {AbstractType, ClassType} from "../types"
import {UndefinedError} from "../exceptions"
import {ArrayList} from "../list"

const compareArrayReducer = (a, b) => (old, cur, i) =>
  old === 0 ? TypeUtils.compare(a[i], b[i]) : old

const compareObjectReducer = (a, b) => (old, cur) =>
  old === 0 && Object.prototype.hasOwnProperty.call(b, cur)
    ? TypeUtils.compare(a[cur], b[cur])
    : old

export class TypeUtils {
  static defined(variable: any): boolean {
    return variable !== undefined && variable !== null
  }

  static notDefined(variable: any): boolean {
    return !TypeUtils.defined(variable)
  }

  static requireDefined<T>(variable: T, message?: string): T {
    if (TypeUtils.notDefined(variable)) throw new UndefinedError(message)
    return variable
  }

  static equals(a: any, b: any): boolean {
    return !!a && !!a.equals && typeof a.equals === "function" ? !!a.equals(b) : a === b
  }

  static getClassName<T>(theClass: ClassType<T>): string {
    return theClass.name
  }

  static instanceOf<T>(value: T, theClass: AbstractType<T>): boolean {
    return value && value instanceof (theClass as ClassType<T>)
  }

  static compare<T, V>(a: T, b: V): number {
    const v = a as any
    if (!!v && typeof v.compare === "function") return v.compare(b)
    if (v instanceof Date && b instanceof Date) return v.getTime() - b.getTime()
    if (!!v && Array.isArray(v) && Array.isArray(b)) return TypeUtils.compareArray(v, b)
    if (!!v && v instanceof ArrayList && b instanceof ArrayList)
      return TypeUtils.compareArray(v.collect(), b.collect())
    if (!!v && typeof v === "object" && typeof b === "object")
      return TypeUtils.compareObject(v, b)
    if (typeof a === "string" && typeof b === "string") return v.localeCompare(b)
    if (typeof a === "number" && typeof b === "number") return v - (b as number)
    if (v === b) return 0
    return -1
  }

  private static compareObject(a: object, b: object): number {
    const aKeys = Object.keys(a)
    const bKeys = Object.keys(b)
    if (aKeys.length === bKeys.length) return aKeys.reduce(compareObjectReducer(a, b), 0)
    return aKeys.length - bKeys.length
  }

  private static compareArray(a: Array<any>, b: Array<any>): number {
    if (a.length === b.length) return a.reduce(compareArrayReducer(a, b), 0)
    return a.length - b.length
  }

  static isRichType(obj: any): boolean {
    return ["object", "function", "array"].some(e => e === typeof obj)
  }
}
