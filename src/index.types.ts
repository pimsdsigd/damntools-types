import {Dict, List} from "./core"

export * from "./exceptions"
export * from "./core"
export * from "./list"
export * from "./stream"
export * from "./dict"
export * from "./enum"
export * from "./optional"
export * from "./utils"
export * from "./TypeUtils"
export * from "./DictUtils"
export * from "./ObjectUtils"

declare global {
  interface Array<T> {
    toList(): List<T>
    toSet(): List<T>
  }

  interface Promise<T> {
    thenDo<TResult1 = T>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null): Promise<TResult1>;
    onError<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
  }

  interface Object {
    toDict<K extends string, V>(): Dict<K, V>
  }
}
