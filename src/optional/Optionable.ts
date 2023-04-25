import {ClassType} from "../Utils";

export interface Optionable<T> {
  get(): T

  filter(predicate: (value: T) => boolean): Optionable<T>

  filterClass<U>(type: ClassType<U>): Optionable<U>

  map<U>(action: (value: T) => U | undefined | null): Optionable<U>

  mapEmpty(action: () => T): Optionable<T>

  flatMap<U>(action: (value: T) => Optionable<U> | undefined | null): Optionable<U>

  orElseReturn(other: T): T

  orElseGet(supplier: () => T): T

  orElseThrow(errorSupplier: () => Error): T

  ifPresentDo(action: (value: T) => void): void

  ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void

  orElse(optionalSupplier: () => Optionable<T>): Optionable<T>

  log(): this

  peek(action: (value: T) => void): Optionable<T>

  isEmpty(): boolean

  isPresent(): boolean

  equals<O>(
    other: O | T | Optionable<O | T>,
    equalityPredicate: (a: O | T, b: O | T) => boolean
  ): boolean

  compare<O>(
    other: O | T | Optionable<O | T>,
    equalityPredicate: (a: O | T, b: O | T) => number
  ): number
}
