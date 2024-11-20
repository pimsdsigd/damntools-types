import {compareStrings} from "../../core"
import {ReferenceAccessor} from "./ReferenceAccessor"

export class ReferenceStringAccessor<T> extends ReferenceAccessor<T, string> {
  constructor(field: keyof T | string) {
    super(field, (a, b) => compareStrings(a, b) === 0)
  }
}
