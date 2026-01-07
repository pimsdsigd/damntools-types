import {AtomicReference} from "./AtomicReference"
import {defined, Optionable} from "../../core"
import {Optional} from "../../optional"

export class AtomicOptional<T> extends AtomicReference<Optionable<T>> {
  constructor(initialValue?: Optionable<T>) {
    super(defined(initialValue) ? initialValue : Optional.empty())
  }
}
