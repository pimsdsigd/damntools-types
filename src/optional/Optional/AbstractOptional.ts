import {ClassType, Optionable} from "../../core"

export abstract class AbstractOptional<T> implements Optionable<T> {
  protected readonly _value: T | undefined

  protected readonly _empty: boolean

  protected constructor(empty?: boolean, value?: T) {
    this._empty = empty
    this._value = value
  }

  protected static isDefined(v: any): boolean {
    return !!v || v === 0 || v === false || v === ""
  }

  log(identifier?: string | number): this {
    const id = identifier || "OptionalLog"
    if (this.isEmpty()) console.debug(id, "Empty")
    else console.debug(id, this._value)
    return this
  }

  abstract equals<O>(
    other: Optionable<T | O>,
    equalityPredicate?: (a: T | O, b: T | O) => boolean
  ): boolean

  abstract filter(predicate: (value: T) => boolean): Optionable<T>

  abstract filterClass<U extends T>(type: ClassType<U>): Optionable<U>

  abstract flatMap<U>(action: (value: T) => Optionable<U>): Optionable<U>

  abstract get(): T

  abstract ifPresentDo(action: (value: T) => void): void

  abstract ifPresentOrElse(action: (value: T) => void, elseAction: () => void): void

  abstract isEmpty(): boolean

  abstract isPresent(): boolean

  abstract map<U>(action: (value: T) => U): Optionable<U>

  abstract mapEmpty(action: () => T): Optionable<T>

  abstract orElse(optionalSupplier: () => Optionable<T>): Optionable<T>

  abstract orElseGet(supplier: () => T): T

  abstract orElseReturn(other: T): T

  abstract orElseThrow(errorSupplier: () => Error): T

  abstract orElseUndefined(): T | undefined

  abstract peek(action: (value: T) => void): Optionable<T>
}
