import {Dict, List} from "./core"

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

    log<T>(
      name?: string
    ): Promise<T>

    startTimer<T>(
      name?: string
    ): Promise<T>

    logDuration<T>(
      startTime?: number,
      name?: string
    ): Promise<T>

    logTimer<T>(
      name?: string
    ): Promise<T>

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
