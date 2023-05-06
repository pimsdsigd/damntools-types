import {Optional} from "../optional"
import {Stream} from "./Stream"

export type AbstractedArray<T> = Array<T> | List<T>

export type ConcatArgType<T> = Array<AbstractedArray<T>>

export type SortFunction<T> = (a: T, b: T) => number

export type PeekFunction<T> = (value: T, index?: number, array?: List<T>) => void

export interface List<T> {
  clear(): void

  size(): number

  isEmpty(): boolean

  hasElements(): boolean

  copy(): List<T>

  first(): T

  last(): T

  get(index: number): T | undefined

  indexOf(value: T): Optional<number>

  getOptional(index: number): Optional<T>

  push(...items: Array<T | undefined>): this

  remove(index: number): this

  reverse(): this

  sort(compareFn?: SortFunction<T>): this

  sub(start: number, end?: number): List<T>

  concat(...items: ConcatArgType<T>): this

  insert(start: number, deleteCount?: number, items?: AbstractedArray<T>): this

  forEach(action: PeekFunction<T>): this

  getInner(): Array<T>

  stream(): Stream<T>
}
