import {Comparator, compare, Optionable} from "../core"
import {Optional} from "../optional"

export class ReferenceAccessor<T, F extends keyof T, O extends T[F]> {
  private readonly _field: F
  private readonly _compareFn: (a: T[F], b: T[F]) => number

  constructor(field: F, compareFn?: Comparator<T[F]>) {
    this._field = field
    this._compareFn = compareFn || compare
  }

  public compareAndSet(ref: T, expected: O, set: O) {
    const get = this.get(ref)
    if (this.internalCompare(get, expected)) {
      ref[this._field] = set
      return true
    }
    return false
  }

  public set(ref: T, value: O) {
    ref[this._field] = value
  }

  public get(ref: T): O {
    return ref[this._field] as O
  }

  public getOptional(ref: T): Optionable<O> {
    return Optional.nullable(ref).map(r => r[this._field] as O)
  }

  public getAndSet(ref: T, set: O): O {
    let previous: O
    do {
      previous = this.get(ref)
    } while (!this.compareAndSet(ref, previous, set))
    return previous
  }

  private internalCompare(get: T[F], expected: O): boolean {
    if (get === undefined && expected === undefined) return true
    if (get === null && expected === null) return true
    if( get === null || get === undefined || expected === null || expected === undefined ) return false
    if (this._compareFn) return this._compareFn(get, expected) === 0
    return false
  }
}