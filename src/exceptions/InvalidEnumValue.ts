import {Enum} from "../enum"

export class InvalidEnumValue extends Error {
  constructor(enumType: typeof Enum, value: string | number) {
    super(`Invalid value ${value} for enum ${enumType}`)
  }
}
