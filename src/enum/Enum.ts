import {TypeUtils} from "../types"
import {InvalidEnumValue} from "../exceptions"
import {Optional} from "../optional"
import {ArrayList, List} from "../list"

export type EnumKey = string | number

const COUNTER = {
  counter: 0
}

const invalidEnumSupplier = (type: any, value: any) => () =>
  new InvalidEnumValue(type, value)
const fromValuePredicate = (value: any) => (e: Enum<any>) => e.key() === value

const instanceReducer = (type: any) => v => type[v] instanceof type
const instanceEnumMapper = (type: any) => v => type[v]

export abstract class Enum<K extends EnumKey> {
  private readonly _key: K
  private readonly _ordinal?: number

  protected constructor(key: K, ordinal?: number) {
    this._key = key
    this._ordinal = ordinal || COUNTER.counter
    COUNTER.counter++
  }

  key(): K {
    return this._key
  }

  ordinal(): number {
    return this._ordinal
  }

  equals(other: Enum<K>): boolean {
    return other && TypeUtils.equals(this._key, other._key)
  }

  compare(other: Enum<K>): number {
    return (
      (!!other &&
        !!other._key &&
        ((!!this._ordinal && TypeUtils.compare(this._ordinal, other._ordinal)) ||
          TypeUtils.compare(this._key, other._key))) ||
      0
    )
  }

  static fromValue<K extends EnumKey, T extends Enum<K>>(value: K): T {
    if (!value) throw new InvalidEnumValue(this, value)
    return this.all<T>()
      .stream()
      .findOrThrow(fromValuePredicate(value), invalidEnumSupplier(this, value))
  }

  static optionalFromValue<K extends EnumKey, T extends Enum<K>>(value: K): Optional<T> {
    if (!value) throw new InvalidEnumValue(this, value)
    if (value instanceof Enum) value = value._key
    const found = this.all<T>().stream().find(fromValuePredicate(value))
    return found ? Optional.of(found) : Optional.empty()
  }

  static all<T extends Enum<EnumKey>>(): List<T> {
    return ArrayList.from(
      Object.keys(this).filter(instanceReducer(this)).map(instanceEnumMapper(this))
    )
  }
}
