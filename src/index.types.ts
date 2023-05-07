import {ArrayList} from "./list"
import {Dict, DictKeyType} from "./dict"


export * from "./exceptions"
export * from "./list"
export * from "./optional"
export * from "./dict"
export * from "./types"
export * from "./enum"
export * from "./DictUtils"
export * from "./ObjectUtils"
export * from "./Utils"

declare global {
  interface Array<T> {
    toList(): ArrayList<T>
  }

  interface Object {
    toDict<K extends DictKeyType, V>(): Dict<K, V>
  }
}
