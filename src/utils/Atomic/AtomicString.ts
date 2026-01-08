import {AtomicReference} from "./AtomicReference"
import {defined} from "../../core"

export class AtomicString<S extends string = string> extends AtomicReference<S> {
  constructor(initialValue?: S) {
    super(defined(initialValue) ? initialValue : undefined)
  }
}
