import {Dict, List} from "./core"
import {Tuple2} from "./utils";

export * from "./exceptions"
export * from "./core"
export * from "./list"
export * from "./stream"
export * from "./dict"
export * from "./enum"
export * from "./optional"
export * from "./utils"

declare global {
  interface Array<T> {
    toList(): List<T>

    toSet(): List<T>
  }

  interface Promise<T> {
    thenDo<TResult1 = T>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1> | void)
        | undefined
        | null
    ): Promise<T>

    thenReturn<O>(value: O): Promise<O>

    log(
      name?: string
    ): Promise<T>

    startTimer(
      name?: string
    ): Promise<T>

    logDuration(
      startTime?: number,
      name?: string
    ): Promise<T>

    logTimer(
      name?: string
    ): Promise<T>

    zipWith<O>(
      promise: Promise<O> | ((value?: T) => Promise<O>)
    ): Promise<Tuple2<T, O>>

    onError<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult> | void)
        | undefined
        | null
    ): Promise<T>
  }

  interface Object {
    toDict<K extends string, V>(): Dict<K, V>
  }
}
