import {Optionable} from "../../core"
import {Optional} from "../../optional"

export class AtomicReference<T> {
  protected value: Optionable<T>

  constructor(initialValue?: T) {
    this.value = Optional.nullable(initialValue)
  }

  set(value: T): void {
    this.value = Optional.nullable(value)
  }

  get(): T {
    return this.value.orElseUndefined()
  }

  getOptional(): Optionable<T> {
    return this.value
  }

  getAndSet(value: T): T {
    const get = this.value
    this.value = Optional.nullable(value)
    return get.orElseUndefined()
  }

  setAndGet(value: T): T {
    this.value = Optional.nullable(value)
    return this.value.orElseUndefined()
  }
}
