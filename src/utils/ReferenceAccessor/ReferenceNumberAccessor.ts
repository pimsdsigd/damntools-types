import {ReferenceAccessor} from "./ReferenceAccessor"

export class ReferenceNumberAccessor<T> extends ReferenceAccessor<T, number> {
  constructor(field: keyof T | string) {
    super(field, (a, b) => b === a)
  }
}
