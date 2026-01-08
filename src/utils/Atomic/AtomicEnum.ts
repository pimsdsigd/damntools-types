import {AtomicReference} from "./AtomicReference"
import {Enum} from "../../enum"

export class AtomicEnum<T extends string> extends AtomicReference<Enum<T>> {
  constructor(initialValue?: Enum<T>) {
    super(initialValue)
  }
}
