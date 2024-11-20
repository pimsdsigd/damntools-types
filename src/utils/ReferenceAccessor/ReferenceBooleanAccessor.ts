import {ReferenceAccessor} from "./ReferenceAccessor"

export class ReferenceBooleanAccessor<T> extends ReferenceAccessor<T, boolean> {
  constructor(field: keyof T | string) {
    super(field, (a, b) => a === b)
  }
}
