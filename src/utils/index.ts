import {AbstractedArray, isList, List} from "../core"
import {InvalidArrayError} from "../exceptions"
import {ArrayList} from "../list"

export * from "./Lists"
export * from "./Streams"
export * from "./Collectors"
export * from "./Functions"
export * from "./Promise"
export * from "./TypeUtils"
export * from "./ObjectUtils"
export * from "./DictUtils"
export const abstractArrayToList = <T>(obj: AbstractedArray<T>): List<T> => {
  if (isList(obj)) return obj as List<T>
  else if (Array.isArray(obj)) return new ArrayList(obj)
  throw new InvalidArrayError("Object is not an Array or a List")
}
