import {List, PeekFunction, SortFunction} from "./List"
import {ClassType} from "../types"
import {Optional} from "../optional"

export type ReducerFunction<T, U> = (
  previousValue: U,
  currentValue: T,
  index?: number,
  array?: List<T>
) => U

export type SearchPredicate<T> = (value: T, index?: number, array?: List<T>) => boolean
export type JoinFunction<T> = (value: T) => string

export type EqualityPredicate<T, O> = (a: T, b: O) => boolean

export type MapFunction<T, U> = (value: T, index?: number, array?: List<T>) => U

export type MapDefinedFunction<T, U> = (value: T, index?: number, array?: List<T>) => U

export type MapUndefinedFunction<T, U> = (index?: number, array?: List<T>) => U | T

export type FlatMapFunction<T, U> = (
  value: T,
  index?: number,
  array?: List<T>
) => List<U> | Array<U>

export interface Stream<T> {
  concat(items: Stream<T>): Stream<T>

  reverse(): Stream<T>

  sort(compareFn?: SortFunction<T>): Stream<T>

  peek(action: PeekFunction<T>): Stream<T>

  peekDefined(action: PeekFunction<T>): Stream<T>

  log(identifier?: string | number): Stream<T>

  log(identifier?: string | number, entryFormatter?: (entry: T) => string): Stream<T>

  map<U>(action: MapFunction<T, U>): Stream<U>

  mapDefined<U>(action: MapDefinedFunction<T, U>): Stream<U>

  mapUndefined<U>(action: MapUndefinedFunction<T, U>): Stream<U | T>

  flat<U>(depth?: number): Stream<U>

  flatMap<U>(action: FlatMapFunction<T, U>, depth?: number): Stream<U>

  filterClass<U extends T>(type: ClassType<U>): Stream<U>

  filter(predicate: SearchPredicate<T>): Stream<T>

  filterPresent(): Stream<NonNullable<T>>

  filterNotPresent(): Stream<undefined | null>

  unique(equalityPredicate?: EqualityPredicate<T, T>): Stream<T>

  every(predicate: SearchPredicate<T>): boolean

  some(predicate: SearchPredicate<T>): boolean

  none(predicate: SearchPredicate<T>): boolean

  findOrThrow(predicate: SearchPredicate<T>, exception: () => Error): T

  find(predicate: SearchPredicate<T>): T | undefined

  findOptional(predicate: SearchPredicate<T>): Optional<T>

  findIndex(predicate: SearchPredicate<T>): number

  findFirst(): Optional<T>

  findLast(): Optional<T>

  reduce<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U

  reduceRight<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U

  join(separator?: string): string

  count(predicate: SearchPredicate<T>): number

  collect(): List<T>

  collectArray(): Array<T>
}