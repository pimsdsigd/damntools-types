import {AbstractType} from "../../core"
import {TypeUtils} from "../../TypeUtils"
import {ObjectUtils} from "../../ObjectUtils"

export abstract class Functions {
  static instanceOf<T>(className: AbstractType<T>): (value: T) => boolean {
    return value => TypeUtils.instanceOf(value, className)
  }

  static containsProperty(propertyName: string): (obj: object) => boolean {
    return (obj: object) => ObjectUtils.containsProperty(obj, propertyName)
  }

  static containsMethod(methodName: string): (obj: object) => boolean {
    return (obj: object) => ObjectUtils.containsMethod(obj, methodName)
  }

  static pathAccessor<T>(
    path: string,
    defaultValue?: T,
    separator?: string
  ): (obj: object) => T {
    return (obj: object) => ObjectUtils.pathAccessor(obj, path, defaultValue, separator)
  }
}
