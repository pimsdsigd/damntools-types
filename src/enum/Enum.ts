import {TypeUtils} from "../types"
import {InvalidEnumKey} from "../exceptions"
import {Optional} from "../optional"
import {ArrayList, List} from "../list"
import {defined, notDefined} from "../Utils"

export type EnumKey = string | number

const invalidEnumSupplier = (type: any, value: any) => () =>
  new InvalidEnumKey(type, value)
const fromValuePredicate = (value: any) => (e: Enum<any>) => e.key() === value

const instanceReducer = (type: any) => v => type[v] instanceof type
const instanceEnumMapper = (type: any) => v => type[v]

export abstract class Enum<K extends EnumKey> {
  private static COUNTER = {
    counter: 0
  }

  private readonly _key: K
  private readonly _ordinal?: number

  protected constructor(key: K, ordinal?: number) {
    this._key = key
    this._ordinal = ordinal || Enum.COUNTER.counter
    Enum.COUNTER.counter++
  }

  key(): K {
    return this._key
  }

  ordinal(): number {
    return this._ordinal
  }

  equals(other: Enum<K>): boolean {
    return defined(other) && TypeUtils.equals(this._key, other._key)
  }

  compare(other: Enum<K>): number {
    return (
      (defined(other) &&
        defined(other._key) &&
        ((!!this._ordinal && this._ordinal - other._ordinal) ||
          TypeUtils.compare(this._key, other._key))) ||
      0
    )
  }

  static fromValue<K extends EnumKey, T extends Enum<K>>(value: K): T {
    if (notDefined(value)) throw new InvalidEnumKey(this, value)
    return this.all<T>()
      .stream()
      .findOrThrow(fromValuePredicate(value), invalidEnumSupplier(this, value))
  }

  static optionalFromValue<K extends EnumKey, T extends Enum<K>>(value: K): Optional<T> {
    if (notDefined(value)) throw new InvalidEnumKey(this, value)
    const found = this.all<T>().stream().find(fromValuePredicate(value))
    return found ? Optional.of(found) : Optional.empty()
  }

  static all<T extends Enum<EnumKey>>(): List<T> {
    return ArrayList.from(
      Object.keys(this).filter(instanceReducer(this)).map(instanceEnumMapper(this))
    )
  }
}
