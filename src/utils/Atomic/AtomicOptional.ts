import {AtomicReference} from "./AtomicReference"
import {defined, Optionable} from "../../core"

export class AtomicOptional<T> extends AtomicReference<T> {
  constructor(initialValue?: Optionable<T>) {
    super(defined(initialValue) ? initialValue.orElseUndefined() : undefined)
  }
}
