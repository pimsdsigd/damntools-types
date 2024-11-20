import {ReferenceAccessor} from "./ReferenceAccessor"

export class ReferenceNumberAccessor<T> extends ReferenceAccessor<T, number> {
  constructor(field: keyof T | string) {
    super(field, (a, b) => b === a)
  }

  public incrementAndGet(obj: T): number {
    const value = this.get(obj) + 1
    this.set(obj, value)
    return value
  }

  public decrementAndGet(obj: T): number {
    const value = this.get(obj) - 1
    this.set(obj, value)
    return value
  }

  public getAndIncrement(obj: T): number {
    const value = this.get(obj)
    this.set(obj, value + 1)
    return value
  }

  public getAndDecrement(obj: T): number {
    const value = this.get(obj)
    this.set(obj, value - 1)
    return value
  }

  public addAndGet(obj: T, add: number): number {
    const value = this.get(obj)
    this.set(obj, value + add)
    return value
  }
}
