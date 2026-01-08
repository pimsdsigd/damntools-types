import {AtomicReference} from "./AtomicReference"

export class AtomicBoolean extends AtomicReference<boolean> {
  constructor(initialValue?: boolean) {
    super(!!initialValue)
  }

  toggle(): void {
    this.value = this.value.map(v => !v)
  }

  toggleAndGet(): boolean {
    this.value = this.value.map(v => !v)
    return this.value.orElseReturn(false)
  }

  getAndToggle(): boolean {
    const get = this.value.orElseReturn(false)
    this.value = this.value.map(v => !v)
    return get
  }
}
