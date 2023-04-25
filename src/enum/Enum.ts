import {ObjectUtils} from "../../../utils/src/utils"
import {InvalidEnumValue} from "../../../utils/src/exceptions"
import {List, Optional} from "@damntools.fr/streamable"

export type EnumKey = string | number

const COUNTER = {
  counter: 0
}

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
    return other && ObjectUtils.equals(this._key, other._key)
  }

  compare(other: Enum<K>): number {
    return (
      (!!other &&
        !!other._key &&
        ((!!this._ordinal && ObjectUtils.compare(this._ordinal, other._ordinal)) ||
          ObjectUtils.compare(this._key, other._key))) ||
      0
    )
  }

  static fromValue<K extends EnumKey, T extends Enum<K>>(value: K): T {
    if (!value) throw new InvalidEnumValue(this, value)
    return this.all<T>().findOrThrow(
      i => i._key === value,
      () => new InvalidEnumValue(this, value)
    )
  }

  static optionalFromValue<K extends EnumKey, T extends Enum<K>>(value: K): Optional<T> {
    if (!value) throw new InvalidEnumValue(this, value)
    if (value instanceof Enum) value = value._key
    const found = this.all<T>().find(i => i._key === value)
    return found ? Optional.of(found) : Optional.empty()
  }

  static all<T extends Enum<EnumKey>>(): List<T> {
    return Object.keys(this)
      .filter(value => this[value] instanceof Enum)
      .map(value => this[value])
      .toList() as List<T>
  }
}
