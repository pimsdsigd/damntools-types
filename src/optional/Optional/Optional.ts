import {Optionable} from "../Optionable"
import {EmptyOptionalAccessError} from "../../exceptions"
import {defined} from "../../Utils"
import {ClassType, TypeUtils} from "../../types"

export class Optional<T> implements Optionable<T> {
  protected readonly value: T | undefined

  protected readonly empty: boolean

  protected constructor(value?: T) {
    this.empty = defined(value)
    this.value = value
  }

  get(): T {
    if (this.isEmpty()) throw new EmptyOptionalAccessError()
    return this.value
  }

  filter(predicate: (value: T) => boolean): Optional<T> {
    if (this.isEmpty() || !predicate(this.value)) return Optional.empty()
    return Optional.of(this.value)
  }

  filterClass<U>(type: ClassType<U>): Optional<U> {
    if (this.isEmpty() || !(this.value instanceof type)) return Optional.empty()
    return Optional.of(this.value)
  }

  map<U>(action: (value: T) => U): Optional<U> {
    if (this.isEmpty()) return Optional.empty()
    const value = action(this.value)
    if (defined(value)) return Optional.of(value)
    return Optional.empty()
  }

  mapEmpty(action: () => T): Optional<T> {
    if (this.isPresent()) return this
    const value = action()
    if (defined(value)) return Optional.of(value)
    return Optional.empty()
  }

  flatMap<U>(action: (value: T) => Optional<U>): Optional<U> {
    if (this.isEmpty()) return Optional.empty()
    const value = action(this.value)
    if (defined(value) && value.isPresent()) return Optional.of(value.get())
    return Optional.empty()
  }

  orElseReturn(other: T): T {
    if (this.isEmpty()) return other
    return this.value
  }

  orElseUndefined(): T | undefined {
    if (this.isEmpty()) return undefined
    return this.value
  }

  orElseGet(supplier: () => T): T {
    if (this.isEmpty()) return supplier()
    return this.value
  }

  orElseThrow(errorSupplier: () => Error): T {
    if (this.isEmpty()) throw errorSupplier()
    return this.value
  }

  orElse(optionalSupplier: () => Optional<T>): Optional<T> {
    if (this.isEmpty()) return optionalSupplier()
    return Optional.of(this.value)
  }

  ifPresentDo(action: (value: T) => void): void {
    if (this.isPresent()) action(this.value)
  }

  ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void {
    if (this.isPresent()) action(this.value)
    else elseAction()
  }

  log(identifier?: string | number): this {
    const id = identifier || "OptionalLog"
    if (this.isEmpty()) console.debug(id, "Empty")
    else console.debug(id, this.value)
    return this
  }

  peek(action: (value: T) => void): Optional<T> {
    if (this.isEmpty()) return Optional.empty()
    action(this.value)
    return Optional.of(this.value)
  }

  isEmpty(): boolean {
    return this.empty
  }

  isPresent(): boolean {
    return !this.isEmpty()
  }

  equals<O>(
    other: Optional<T | O>,
    equalityPredicate: (a: T | O, b: T | O) => boolean
  ): boolean {
    if (this.isEmpty() && other.isEmpty()) return true
    if (this.isPresent() && other.isPresent()) {
      return equalityPredicate(this.get(), other.get())
    }
    return false
  }

  compare<O>(
    other: Optional<T | O>,
    equalityPredicate: (a: T | O, b: T | O) => number
  ): number {
    if (this.isEmpty() && other.isEmpty()) return 0
    if (this.isPresent() && other.isPresent()) {
      return equalityPredicate(this.get(), other.get())
    }
    return -1
  }

  static of<U>(value: U): Optional<U> {
    TypeUtils.requireDefined(value, "Value should be defined when using of()")
    return new Optional<U>(value)
  }

  static empty<U>(): Optional<U> {
    return new Optional<U>()
  }

  static nullable<U>(value: U | undefined): Optional<U> {
    return defined(value) ? this.of(value) : this.empty()
  }
}
