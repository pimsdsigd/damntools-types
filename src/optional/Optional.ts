import {Storable} from "../Storable"

export class Optional<T> implements Storable<T> {
  protected readonly value: T
  protected readonly empty: boolean

  private constructor(value: T) {
    this.value = value
    this.empty = value === undefined
  }

  equals<O>(
    other: Optional<O | T> | T | O,
    equalityPredicate: (a: O | T, b: O | T) => boolean
  ): boolean {
    const value = other instanceof Optional ? other.value : other
    return equalityPredicate(this.value, value)
  }

  filter(predicate: (value: T) => boolean): Optional<T> {
    if (predicate(this.value)) return this
    return new Optional(undefined)
  }

  get(): T | undefined {
    return this.value
  }

  map<U>(action: (value: T) => U): Optional<U | T> {
    if (this.isEmpty()) {
      const value = action(this.value)
      return new Optional<U>(value)
    }
    return this
  }

  peek(action: (value: T) => void): Optional<T> {
    if (this.isEmpty()) action(this.value)
    return this
  }

  orElse<U>(value: U): U | T {
    if (this.isEmpty()) return value
    return this.value
  }

  orElseThrow(value: Error): T {
    if (this.isEmpty()) throw value
    return this.value
  }

  isEmpty(): boolean {
    return this.empty
  }

  static of<U>(value: U): Optional<U> {
    return new Optional<U>(value)
  }

  static empty<U>(): Optional<U> {
    return new Optional<U>(undefined)
  }
}
