import {ArrayList} from "../ArrayList"
import {IllegalAccessError} from "../../exceptions"
import {AbstractedArray, isList} from "../../core"

export class StaticArrayList<T> extends ArrayList<T> {
  constructor(array: AbstractedArray<T>) {
    let capacity = 0
    if (array instanceof Array) capacity = array.length
    else if (isList(array)) capacity = array.size()
    super(array, capacity)
  }

  clear(): this {
    this.throwIllegalAccess()
    return this
  }

  remove(): this {
    this.throwIllegalAccess()
    return this
  }

  delete(): this {
    this.throwIllegalAccess()
    return this
  }

  insert(): this {
    this.throwIllegalAccess()
    return this
  }

  replace(): this {
    this.throwIllegalAccess()
    return this
  }

  replaceFrom(): this {
    this.throwIllegalAccess()
    return this
  }

  push(): this {
    this.throwIllegalAccess()
    return this
  }

  concat(): this {
    this.throwIllegalAccess()
    return this
  }

  sort(): this {
    this.throwIllegalAccess()
    return this
  }

  sortWith(): this {
    this.throwIllegalAccess()
    return this
  }

  reverse(): this {
    this.throwIllegalAccess()
    return this
  }
  
  double(): this {
    this.throwIllegalAccess()
    return this
  }

  private throwIllegalAccess() {
    throw new IllegalAccessError("List is not modifiable !")
  }
}
