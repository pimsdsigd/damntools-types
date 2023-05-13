import {Enum} from "../enum"

export class InvalidEnumValue extends Error {
  constructor(enumType: typeof Enum, value: string | number) {
    super(`Invalid value ${value} for enum ${enumType}`)
  }
}
export class InvalidEnumKey extends Error {
  constructor(enumType: typeof Enum, key: string | number) {
    super(`Invalid key ${key} for enum ${enumType}`)
  }
}
