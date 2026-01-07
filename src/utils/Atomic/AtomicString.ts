import {AtomicReference} from "./AtomicReference"
import {defined} from "../../core"

export class AtomicString extends AtomicReference<string> {
  constructor(initialValue?: string) {
    super(defined(initialValue) ? initialValue : "")
  }

  replace(pattern: RegExp | string, newValue?: string) {
    this.value = this.value.replace(pattern, newValue)
  }

  replaceAndGet(pattern: RegExp | string, newValue?: string) {
    this.value = this.value.replace(pattern, newValue)
    return this.value
  }

  getAndReplace(pattern: RegExp | string, newValue?: string) {
    const get = this.value
    this.value = this.value.replace(pattern, newValue)
    return get
  }

  concat(...strings: string[]) {
    this.value = this.value.concat(...strings)
  }

  concatAndGet(...strings: string[]) {
    this.value = this.value.concat(...strings)
    return this.value
  }

  getAndConcat(...strings: string[]) {
    const get = this.value
    this.value = this.value.concat(...strings)
    return get
  }
}
