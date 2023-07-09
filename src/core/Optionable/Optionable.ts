import {ClassType} from "../ClassType"

export interface Optionable<T> {
  get(): T

  filter(predicate: (value: T) => boolean): Optionable<T>

  filterClass<U extends T>(type: ClassType<U>): Optionable<U>

  map<U>(action: (value: T) => U): Optionable<U>

  mapEmpty(action: () => T): Optionable<T>

  flatMap<U>(action: (value: T) => Optionable<U>): Optionable<U>

  orElseReturn(other: T): T

  orElseUndefined(): T | undefined

  orElseGet(supplier: () => T): T

  orElseThrow(errorSupplier: () => Error): T

  orElse(optionalSupplier: () => Optionable<T>): Optionable<T>

  ifPresentDo(action: (value: T) => void): void

  ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void

  log(identifier?: string | number): this

  peek(action: (value: T) => void): Optionable<T>

  isEmpty(): boolean

  isPresent(): boolean

  equals<O>(
    other: Optionable<T | O>,
    equalityPredicate?: (a: T | O, b: T | O) => boolean
  ): boolean
}
