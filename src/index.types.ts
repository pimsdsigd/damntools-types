import {Dict, List} from "./core"

export * from "./exceptions"
export * from "./core"
export * from "./list"
export * from "./stream"
export * from "./dict"
export * from "./enum"
export * from "./utils"
export * from "./TypeUtils"
export * from "./DictUtils"
export * from "./ObjectUtils"

declare global {
  interface Array<T> {
    toList(): List<T>
  }

  interface Object {
    toDict<V>(): Dict<V>
  }
}
