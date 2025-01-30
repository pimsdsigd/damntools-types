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

  /**
   * Thanks to StefansArya
   * https://stackoverflow.com/a/66120819
   * @param theClass
   */
  static isClass<T>(theClass: AbstractType<T>): theClass is ClassType<T> {
    // @ts-ignore
    if(!(theClass && theClass.constructor === Function) || theClass.prototype === undefined)
      return false;

    if(Function.prototype !== Object.getPrototypeOf(theClass))
      return true;

    // @ts-ignore
    return Object.getOwnPropertyNames(theClass.prototype).length > 1;
  }

  static isRichType(obj: any): boolean {
    return ["object", "function", "array"].some(e => e === typeof obj)
  }
}
