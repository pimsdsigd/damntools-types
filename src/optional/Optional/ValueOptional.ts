import {ClassType, equals, Optionable, Stream} from "../../core"
import {Optional} from "./Optional"
import {AbstractOptional} from "./AbstractOptional"
import {ListStream} from "../../stream";

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
    return new ListStream<T>([this._value]);
  }
}
