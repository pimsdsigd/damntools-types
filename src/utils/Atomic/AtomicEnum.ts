import {AtomicReference} from "./AtomicReference"
import {Enum} from "../../enum"

export class AtomicEnum<T extends Enum<any>> extends AtomicReference<T> {
  constructor(initialValue?: T) {
    super(initialValue)
  }
}
