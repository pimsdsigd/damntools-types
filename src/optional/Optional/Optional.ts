import {EmptyOptionalAccessError} from "../../exceptions"
import {
  ClassType,
  defined,
  equals,
  notDefined,
  Optionable,
  requireDefined
} from "../../core"

export class Optional<T> implements Optionable<T> {
  public static EMPTY = new Optional()

  protected readonly _value: T | undefined

  protected readonly _empty: boolean

  protected constructor(value?: T) {
    this._empty = notDefined(value)
    this._value = value
  }

  static of<U>(value: U): Optionable<U> {
    requireDefined(value, "Value should be defined when using of()")
    return new Optional<U>(value)
  }

  static empty<U>(): Optionable<U> {
    return this.EMPTY as Optional<U>
  }

  static nullable<U>(value: U | undefined | null): Optionable<U> {
    return defined(value) ? this.of(value) : this.empty()
  }

  static fromString(value: string | undefined | null): Optionable<string> {
    return defined(value) || value.length > 0 ? this.of(value) : this.empty()
  }

  get(): T {
    if (this.isEmpty()) throw new EmptyOptionalAccessError()
    return this._value
  }

  filter(predicate: (value: T) => boolean): Optionable<T> {
    if (this.isEmpty() || !predicate(this._value)) return Optional.empty()
    return Optional.of(this._value)
  }

  filterClass<U extends T>(type: ClassType<U>): Optionable<U> {
    if (this.isEmpty() || !(this._value instanceof type)) return Optional.empty()
    return Optional.of(this._value)
  }

  map<U>(action: (value: T) => U): Optionable<U> {
    if (this.isEmpty()) return Optional.empty()
    const value = action(this._value)
    if (defined(value)) return Optional.of(value)
    return Optional.empty()
  }

  mapEmpty(action: () => T): Optionable<T> {
    if (this.isPresent()) return this
    const value = action()
    if (defined(value)) return Optional.of(value)
    return Optional.empty()
  }

  flatMap<U>(action: (value: T) => Optionable<U>): Optionable<U> {
    if (this.isEmpty()) return Optional.empty()
    const value = action(this._value)
    if (defined(value) && value.isPresent()) return Optional.of(value.get())
    return Optional.empty()
  }

  orElseReturn(other: T): T {
    if (this.isEmpty()) return other
    return this._value
  }

  orElseUndefined(): T | undefined {
    if (this.isEmpty()) return undefined
    return this._value
  }

  orElseGet(supplier: () => T): T {
    if (this.isEmpty()) return supplier()
    return this._value
  }

  orElseThrow(errorSupplier: () => Error): T {
    if (this.isEmpty()) {
      const error = errorSupplier()
      if (error) throw error
      throw new EmptyOptionalAccessError()
    }
    return this._value
  }

  orElse(optionalSupplier: () => Optionable<T>): Optionable<T> {
    if (this.isEmpty()) {
      const supplied = optionalSupplier()
      if (supplied && supplied.isPresent()) return supplied
      return Optional.empty()
    }
    return Optional.of(this._value)
  }

  ifPresentDo(action: (value: T) => void): void {
    if (this.isPresent()) action(this._value)
  }

  ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void {
    if (this.isPresent()) action(this._value)
    else elseAction()
  }

  log(identifier?: string | number): this {
    const id = identifier || "OptionalLog"
    if (this.isEmpty()) console.debug(id, "Empty")
    else console.debug(id, this._value)
    return this
  }

  peek(action: (value: T) => void): Optionable<T> {
    if (this.isEmpty()) return Optional.empty()
    action(this._value)
    return this
  }

  isEmpty(): boolean {
    return this._empty
  }

  isPresent(): boolean {
    return !this.isEmpty()
  }

  equals<O>(
    other: Optionable<T | O>,
    equalityPredicate?: (a: T | O, b: T | O) => boolean
  ): boolean {
    if (this.isEmpty() && other.isEmpty()) return true
    if (this.isPresent() && other.isPresent()) {
      if (!equalityPredicate) equalityPredicate = equals
      return equalityPredicate(this.get(), other.get())
    }
    return false
  }
}
