import {AtomicReference} from "./AtomicReference"
import {defined} from "../../core"

export class AtomicNumber extends AtomicReference<number> {
  constructor(initialValue?: number) {
    super(defined(initialValue) ? initialValue : 0)
  }

  increment(increment?: number) {
    increment = increment || 1
    this.value = this.value.map(v => v + increment)
  }

  incrementAndGet(increment?: number): number {
    increment = increment || 1
    this.value = this.value.map(v => v + increment)
    return this.value.orElseUndefined()
  }

  getAndIncrement(increment?: number): number {
    increment = increment || 1
    const get = this.value
    this.value = this.value.map(v => v + increment)
    return get.orElseUndefined()
  }

  decrement(decrement?: number){
    decrement = decrement || 1
    this.value = this.value.map(v => v - decrement)
  }

  decrementAndGet(decrement?: number): number {
    decrement = decrement || 1
    this.value = this.value.map(v => v - decrement)
    return this.value.orElseUndefined()
  }

  getAndDecrement(decrement?: number): number {
    decrement = decrement || 1
    const get = this.value
    this.value = this.value.map(v => v - decrement)
    return get.orElseUndefined()
  }
}
