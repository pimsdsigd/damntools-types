import {Stream} from "../Stream"
import {Optionable} from "../Optionable"
import {Comparator} from "../Comparator"

export type AbstractedArray<T> = Array<T> | List<T>

export type ConcatArgType<T> = Array<AbstractedArray<T>>

export type SortFunction<T> = (a: T, b: T) => number

export type PeekFunction<T> = (value: T, index?: number, array?: Array<T>) => void

export interface List<T> {
  clear(): this

  size(): number

  isEmpty(): boolean

  hasElements(): boolean

  copy(): List<T>

  first(): Optionable<T>

  last(): Optionable<T>

  get(index: number): T | undefined

  indexOf(value: T): Optionable<number>

  getOptional(index: number): Optionable<T>

  includes(item: T): boolean

  forEach(action: (value: T) => void): this

  forEach(action: (value: T, index: number) => void): this

  forEach(action: (value: T, index: number, array: Array<T>) => void): this

  getInner(): Array<T>

  stream(): Stream<T>

  push(...items: Array<T | undefined>): this

  remove(index: number): this

  delete(start: number, end?: number): this

  reverse(): this

  sort(compareFn: Comparator<T>): this

  sortWith(key: keyof T): this

  concat(...items: ConcatArgType<T>): this

  insert(start: number): this

  insert(start: number, items: AbstractedArray<T>): this

  replace(start: number): this

  replace(start: number, items: AbstractedArray<T>): this

  replaceFrom(start: number): this

  replaceFrom(start: number, items: AbstractedArray<T>): this

  sub(start: number): this

  sub(start: number, end: number): this

  toString(): string

  double(): this
}
