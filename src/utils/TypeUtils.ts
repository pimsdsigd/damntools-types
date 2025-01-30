import {AbstractType, ClassType} from "../core"

export class TypeUtils {
  static getClassName<T>(theClass: ClassType<T>): string {
    return theClass.name
  }

  static instanceOf<T>(value: T, theClass: AbstractType<T>): boolean {
    return (
      (value && value instanceof (theClass as ClassType<T>)) ||
      (theClass === Number && typeof value === "number") ||
      (theClass === Boolean && typeof value === "boolean") ||
      (theClass === String && typeof value === "string")
    )
  }

  static isClass<T>(theClass: AbstractType<T>): theClass is ClassType<T> {
    return (theClass && !!theClass.new)
  }

  static isRichType(obj: any): boolean {
    return ["object", "function", "array"].some(e => e === typeof obj)
  }
}
