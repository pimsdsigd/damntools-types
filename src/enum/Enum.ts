import {InvalidEnumKey} from "../exceptions"
import {List, Optionable} from "../core"
import {Lists} from "../utils"
import {Optional} from "../optional"

export type EnumKey = string | number

const invalidEnumSupplier = (type: any, value: any) => () =>
  new InvalidEnumKey(type, value)
const fromValuePredicate = (value: any) => (e: Enum<any>) => e.key() === value

const instanceReducer = (type: any) => v => type[v] instanceof type
const instanceEnumMapper = (type: any) => v => type[v]

const compareKeyFn = (a: EnumKey, b: EnumKey) => {
  if (typeof a === "string" && typeof b === "string") return a.localeCompare(b)
  if (typeof a === "number" && typeof b === "number") return a - b
  return 0
}

const equalsKeyFn = (a: EnumKey, b: EnumKey) => {
  return a === b
}

export abstract class Enum<K extends EnumKey> {
  private static COUNTER = {
    counter: 0
  }

  private readonly _key: K
  private readonly _ordinal: number

  protected constructor(key: K) {
    this._key = key
    this._ordinal = Enum.COUNTER.counter
    Enum.COUNTER.counter++
  }

  key(): K {
    return this._key
  }

  ordinal(): number {
    return this._ordinal
  }

  equals(other: Enum<K>): boolean {
    return other instanceof this.constructor && equalsKeyFn(this._key, other._key)
  }

  compare(other: Enum<K>): number {
    return (
      (other?._key &&
        ((!!this._ordinal && this._ordinal - other._ordinal) ||
          compareKeyFn(this._key, other._key))) ||
      0
    )
  }

  static fromValue<K extends EnumKey, T extends Enum<K>>(value: K): T {
    if (!value || value === "") throw new InvalidEnumKey(this, value)
    return this.all<T>()
      .stream()
      .findOrThrow(fromValuePredicate(value), invalidEnumSupplier(this, value))
  }

  static optionalFromValue<K extends EnumKey, T extends Enum<K>>(
    value: K
  ): Optionable<T> {
    if (!value || value === "") throw new InvalidEnumKey(this, value)
    const found = this.all<T>().stream().find(fromValuePredicate(value))
    return found ? Optional.of(found) : Optional.empty()
  }

  static all<T extends Enum<EnumKey>>(): List<T> {
    return Lists.from(
      Object.keys(this).filter(instanceReducer(this)).map(instanceEnumMapper(this))
    )
  }
}
