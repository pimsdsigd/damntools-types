export class AtomicReference<T> {
  protected value: T

  constructor(initialValue: T) {
    this.value = initialValue
  }

  set(value: T) {
    this.value = value
  }

  get(): T {
    return this.value
  }

  getAndSet(value: T) {
    const get = this.value
    this.value = value
    return get
  }

  setAndGet(value: T) {
    this.value = value
    return this.value
  }
}
