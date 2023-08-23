import {EmptyOptionalAccessError} from "../../exceptions"
import {Optionable} from "../../core"
import {Optional} from "./Optional"
import {AbstractOptional} from "./AbstractOptional"

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
}
