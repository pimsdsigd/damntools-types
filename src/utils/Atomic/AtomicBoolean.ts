import {AtomicReference} from "./AtomicReference"

export class AtomicBoolean extends AtomicReference<boolean> {
  constructor(initialValue?: boolean) {
    super(!!initialValue)
  }

  toggle() {
    this.value = !this.value
  }

  toggleAndGet() {
    this.value = !this.value
    return this.value
  }

  getAndToggle() {
    const get = this.value
    this.value = !this.value
    return get
  }
}
