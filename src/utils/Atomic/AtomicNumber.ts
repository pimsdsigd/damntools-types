import {AtomicReference} from "./AtomicReference"
import {defined} from "../../core"

export class AtomicNumber extends AtomicReference<number> {
  constructor(initialValue?: number) {
    super(defined(initialValue) ? initialValue : 0)
  }

  increment(increment?: number) {
    increment = increment || 1
    this.value = this.value + increment
  }

  incrementAndGet(increment?: number) {
    increment = increment || 1
    this.value = this.value + increment
    return this.value
  }

  getAndIncrement(increment?: number) {
    increment = increment || 1
    const get = this.value
    this.value = this.value + increment
    return get
  }

  decrement(decrement?: number) {
    decrement = decrement || 1
    this.value = this.value - decrement
  }

  decrementAndGet(decrement?: number) {
    decrement = decrement || 1
    this.value = this.value - decrement
    return this.value
  }

  getAndDecrement(decrement?: number) {
    decrement = decrement || 1
    const get = this.value
    this.value = this.value - decrement
    return get
  }
}
