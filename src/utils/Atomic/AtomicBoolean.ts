export class AtomicBoolean {
  private value: boolean

  constructor(initialValue?: boolean) {
    this.value = !!initialValue
  }

  set(value: boolean) {
    this.value = value
  }

  get(): boolean {
    return this.value
  }

  getAndSet(value: boolean) {
    const get = this.value
    this.value = value
    return get
  }

  setAndGet(value: boolean) {
    this.value = value
    return this.value
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
