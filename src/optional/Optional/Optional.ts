import {ClassType, equals, Optionable, Stream} from "../../core"
import {EmptyOptionalAccessError, UndefinedError} from "../../exceptions"
import {AbstractOptional} from "./AbstractOptional"

export abstract class Optional<T> extends AbstractOptional<T> {
  static of<U>(value: U): Optionable<U> {
    if (!!value || value === 0 || value === false || value === "")
      return new ValueOptional<U>(value)
    throw new UndefinedError("Value should be defined when using of()")
  }

  static empty<U>(): Optionable<U> {
    return EMPTY as Optionable<U>
  }

  static nullable<U>(value: U | undefined | null): Optionable<U> {
    return !!value || value === 0 || value === false || value === ""
      ? new ValueOptional<U>(value)
      : Optional.empty()
  }

  static fromString(value: string | "" | undefined | null): Optionable<string> {
    return (value && value.length) > 0
      ? new ValueOptional<string>(value)
      : Optional.empty()
  }

  static isOptional<T>(obj: Optionable<T> | any): obj is Optionable<T> {
    return obj instanceof ValueOptional || obj instanceof EmptyOptional
  }
}

export const isOptional = Optional.isOptional

export class EmptyOptional<T> extends AbstractOptional<T> {
  constructor(value: T) {
    super(true, value)
  }

  get(): T {
    throw new EmptyOptionalAccessError()
  }

  filter(): Optionable<T> {
    return this
  }

  filterClass<U extends T>(): Optionable<U> {
    return this as any
  }

  map<U>(): Optionable<U> {
    return this as any
  }

  mapEmpty(action: () => T): Optionable<T> {
    const value = action()
    if (AbstractOptional.isDefined(value)) return Optional.of(value)
    return this
  }

  flatMap<U>(): Optionable<U> {
    return this as any
  }

  orElseReturn(other: T): T {
    return other
  }

  orElseUndefined(): T | undefined {
    return undefined
  }

  orElseGet(supplier: () => T): T {
    return supplier()
  }

  orElseThrow(errorSupplier: () => Error): T {
    const error = errorSupplier()
    if (error) throw error
    throw new EmptyOptionalAccessError()
  }

  orElse(optionalSupplier: () => Optionable<T>): Optionable<T> {
    const supplied = optionalSupplier()
    if (supplied && supplied.isPresent()) return supplied
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ifPresentDo(action: (value: T) => void) {
    //
  }

  ifPresentOrElse(action: (value: T) => void, elseAction: () => void) {
    elseAction()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  peek(action: (value: T) => void): Optionable<T> {
    return this
  }

  isEmpty(): boolean {
    return true
  }

  isPresent(): boolean {
    return false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equals<O>(
    other: Optionable<T | O>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    equalityPredicate?: (a: T | O, b: T | O) => boolean
  ): boolean {
    return other.isEmpty()
  }

  toStream(): Stream<T> {
    throw new Error("Undefined method")
  }
}

export class ValueOptional<T> extends AbstractOptional<T> {
  constructor(value: T) {
    super(false, value)
  }

  get(): T {
    return this._value
  }

  filter(predicate: (value: T) => boolean): Optionable<T> {
    if (!predicate(this._value)) return Optional.empty()
    return new ValueOptional(this._value)
  }

  filterClass<U extends T>(type: ClassType<U>): Optionable<U> {
    if (!(this._value instanceof type)) return Optional.empty()
    return new ValueOptional(this._value)
  }

  map<U>(action: (value: T) => U): Optionable<U> {
    const value = action(this._value)
    if (AbstractOptional.isDefined(value)) return new ValueOptional(value)
    return Optional.empty()
  }

  mapEmpty(action: () => T): Optionable<T> {
    if (this.isPresent()) return this
    return Optional.empty<T>().mapEmpty(action)
  }

  flatMap<U>(action: (value: T) => Optionable<U>): Optionable<U> {
    const value = action(this._value)
    if (AbstractOptional.isDefined(value)) return value
    return Optional.empty()
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orElseReturn(other: T): T {
    return this._value
  }

  orElseUndefined(): T | undefined {
    return this._value
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orElseGet(supplier: () => T): T {
    return this._value
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orElseThrow(errorSupplier: () => Error): T {
    return this._value
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  orElse(optionalSupplier: () => Optionable<T>): Optionable<T> {
    return new ValueOptional(this._value)
  }

  ifPresentDo(action: (value: T) => void): void {
    action(this._value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void {
    action(this._value)
  }

  peek(action: (value: T) => void): Optionable<T> {
    action(this._value)
    return this
  }

  isEmpty(): boolean {
    return false
  }

  isPresent(): boolean {
    return true
  }

  equals<O>(
    other: Optionable<T | O>,
    equalityPredicate?: (a: T | O, b: T | O) => boolean
  ): boolean {
    if (other.isEmpty()) return false
    if (!equalityPredicate) equalityPredicate = equals
    return equalityPredicate(this.get(), other.get())
  }

  toStream(): Stream<T> {
    throw new Error("Undefined method")
  }
}

const EMPTY = new EmptyOptional<any>(undefined)
