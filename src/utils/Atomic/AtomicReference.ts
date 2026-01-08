import {Optionable} from "../../core"
import {Optional} from "../../optional"

export class AtomicReference<T> {
  protected value: Optionable<T>
  private readonly defaultValue?: Optionable<T>

  constructor(initialValue?: T) {
    this.value = Optional.nullable(initialValue)
    this.defaultValue = this.value
  }

  set(value: T): void {
    this.value = Optional.nullable(value)
  }

  clear(): void {
    this.value = Optional.empty()
  }

  clearAndGet(): T {
    this.value = Optional.empty()
    return this.value.orElseUndefined()
  }

  getAndClear(): T {
    const get = this.value.orElseUndefined()
    this.value = Optional.empty()
    return get
  }

  reset(): void {
    this.value = this.defaultValue
  }

  resetAndGet(): T {
    this.value = this.defaultValue
    return this.value.orElseUndefined()
  }

  getAndReset(): T {
    const get = this.value.orElseUndefined()
    this.value = this.defaultValue
    return get
  }

  get(): T {
    return this.value.orElseUndefined()
  }

  getOptional(): Optionable<T> {
    return this.value
  }

  getAndSet(value?: T): T {
    const get = this.value
    this.value = Optional.nullable(value)
    return get.orElseUndefined()
  }

  setAndGet(value?: T): T {
    this.value = Optional.nullable(value)
    return this.value.orElseUndefined()
  }
}
