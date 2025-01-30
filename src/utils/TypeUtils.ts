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
    // Class constructor is also a function
    // @ts-ignore
    if(!(theClass && theClass.constructor === Function) || theClass.prototype === undefined)
      return false;

    // This is a class that extends other class
    if(Function.prototype !== Object.getPrototypeOf(theClass))
      return true;

    // Usually a function will only have 'constructor' in the prototype
    // @ts-ignore
    return Object.getOwnPropertyNames(theClass.prototype).length > 1;
  }

  static isRichType(obj: any): boolean {
    return ["object", "function", "array"].some(e => e === typeof obj)
  }
}
