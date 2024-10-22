import {List, PeekFunction, SortFunction} from "../List"
import {Optionable} from "../Optionable"
import {ClassType} from "../ClassType"
import {Dict, DictKeyType} from "../Dict";

export type ReducerFunction<T, U> = (
  previousValue: U,
  currentValue: T,
  index?: number,
  array?: Array<T>
) => U

export type SearchPredicateNarrowing<T, X extends T> = (
  value: T,
  index?: number,
  array?: Array<T>
) => value is X
export type SearchPredicate<T> = (value: T, index?: number, array?: Array<T>) => boolean

export type EqualityPredicate<T, O> = (a: T, b: O) => boolean

export type MapFunction<T, U> = (value: T, index?: number, array?: Array<T>) => U

export type MapDefinedFunction<T, U> = (value: T, index?: number, array?: Array<T>) => U

export type MapUndefinedFunction<T> = (index?: number, array?: Array<T>) => T

export type FlatMapFunction<T, U> = (
  value: T,
  index?: number,
  array?: Array<T>
) => List<U> | Array<U>

export type StreamCollector<T, R> = (items: Array<T>) => R

export interface Stream<T> {
  concat(items: Stream<T>): Stream<T>

  reverse(): Stream<T>

  sort(): Stream<T>

  sort(compareFn?: SortFunction<T>): Stream<T>

  sortWith(key: keyof T): Stream<T>

  peek(action: PeekFunction<T>): Stream<T>

  peekDefined(action: PeekFunction<T>): Stream<T>

  log(identifier?: string | number): Stream<T>

  log(identifier?: string | number, entryFormatter?: (entry: T) => string): Stream<T>

  map<U>(action: (value: T) => U): Stream<U>

  map<U>(action: (value: T, index: number) => U): Stream<U>

  map<U>(action: (value: T, index: number, array: Array<T>) => U): Stream<U>

  mapDefined<U>(action: (value: T) => U): Stream<U>

  mapDefined<U>(action: (value: T, index: number) => U): Stream<U>

  mapDefined<U>(action: (value: T, index: number, array: Array<T>) => U): Stream<U>

  mapUndefined<U>(action: () => U | T): Stream<U | T>

  mapUndefined<U>(action: (index: number) => U | T): Stream<U | T>

  mapUndefined<U>(action: (index: number, array: Array<T>) => U | T): Stream<U | T>

  flat<U>(depth?: number): Stream<U>

  flatMap<U>(action: FlatMapFunction<T, U>, depth?: number): Stream<U>

  filterClass<U extends T>(...types: Array<ClassType<U>>): Stream<U>

  filter<X extends T>(predicate: SearchPredicateNarrowing<T, X>): Stream<X>

  filter(predicate: SearchPredicate<T>): Stream<T>

  filterPresent(): Stream<NonNullable<T>>

  unique(equalityPredicate?: EqualityPredicate<T, T>): Stream<T>

  every(predicate: SearchPredicate<T>): boolean

  some(predicate: SearchPredicate<T>): boolean

  none(predicate: SearchPredicate<T>): boolean

  findOrThrow(predicate: SearchPredicate<T>, exception: () => Error): T

  find(predicate: SearchPredicate<T>): T | undefined

  findOptional(predicate: SearchPredicate<T>): Optionable<T>

  findIndex(predicate: SearchPredicate<T>): number

  findFirst(): Optionable<T>

  findFirst(predicate: SearchPredicate<T>): Optionable<T>

  findFirstIndex(): number

  findFirstIndex(predicate: SearchPredicate<T>): number

  findLast(): Optionable<T>

  findLast(predicate: SearchPredicate<T>): Optionable<T>

  findLastIndex(): number

  groupBy<K extends DictKeyType>(key: keyof T): Dict<K, List<T>>

  findLastIndex(predicate: SearchPredicate<T>): number

  reduce<U>(callbackFn: (previousValue: U, currentValue: T) => U, initialValue: U): U

  reduce<U>(
    callbackFn: (previousValue: U, currentValue: T, index: number) => U,
    initialValue: U
  ): U

  reduce<U>(
    callbackFn: (previousValue: U, currentValue: T, index: number, array: Array<T>) => U,
    initialValue: U
  ): U

  reduceRight<U>(callbackFn: (previousValue: U, currentValue: T) => U, initialValue: U): U

  reduceRight<U>(
    callbackFn: (previousValue: U, currentValue: T, index: number) => U,
    initialValue: U
  ): U

  reduceRight<U>(
    callbackFn: (previousValue: U, currentValue: T, index: number, array: Array<T>) => U,
    initialValue: U
  ): U

  join(): string

  join(separator?: string): string

  count(): number

  count(predicate?: SearchPredicate<T>): number

  countNotPresent(): number

  collect<R>(collector: StreamCollector<T, R>): R

  collectArray(): Array<T>
}
