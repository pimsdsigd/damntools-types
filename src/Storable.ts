export interface Storable<T> {
  get(): T | undefined

  peek(action: (value: T) => void): Storable<T>

  map<U>(action: (value: T) => U): Storable<U | T>

  orElse<U>(value: U): U | T

  orElseThrow(value: Error): T

  isEmpty(): boolean

  filter(predicate: (value: T) => boolean): Storable<T>

  equals<O>(
    other: O | T | Storable<O | T>,
    equalityPredicate: (a: O | T, b: O | T) => boolean
  ): boolean
}
