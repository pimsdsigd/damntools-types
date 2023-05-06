import {ArrayList, peekFn} from "./ArrayList"
import {ClassType, TypeUtils} from "../types"
import {List, PeekFunction, SortFunction} from "./List"
import {Optional} from "../optional"
import {equalsBetween} from "../Utils"
import {
  EqualityPredicate,
  FlatMapFunction,
  MapDefinedFunction,
  MapFunction,
  MapUndefinedFunction,
  ReducerFunction,
  SearchPredicate,
  Stream
} from "./Stream"

const reduceFn = callbackFn => (p, c, i, a) => callbackFn(p, c, i, ArrayList.from(a))
const peekPresentFn = action => (value, index, arr) => {
  if (value) action(value, index, ArrayList.from(arr))
}

const mapFn = action => (value, index, arr) => action(value, index, ArrayList.from(arr))
const mapDefinedFn = action => (value, index, arr) =>
  TypeUtils.defined(value) ? action(value, index, ArrayList.from(arr)) : value

const mapUndefinedFn = action => (value, index, arr) =>
  TypeUtils.notDefined(value) ? action(index, ArrayList.from(arr)) : value

const flatMapFn = item => {
  if (item instanceof ArrayList) return item.getInner()
  return item
}

const predicateFn = predicate => (v, i, a) => predicate(v, i, ArrayList.from(a))

export class ListStream<T> implements Stream<T> {
  private array: Array<T>

  private constructor(array?: Array<T>) {
    this.array = [].concat(array)
  }

  concat(stream: Stream<T>): Stream<T> {
    this.array = this.array.concat(stream.collect().getInner())
    return this
  }

  reverse(): Stream<T> {
    this.array.reverse()
    return this
  }

  sort(compareFn?: SortFunction<T>): Stream<T> {
    this.array.sort(compareFn)
    return this
  }

  peek(action: PeekFunction<T>): Stream<T> {
    this.array.forEach(peekFn(action))
    return this
  }

  peekDefined(action: PeekFunction<T>): Stream<T> {
    this.array.forEach(peekPresentFn(action))
    return this
  }

  map<U>(action: MapFunction<T, U>): Stream<U> {
    this.array = this.array.map(mapFn(action)) as any
    return this as any
  }

  mapDefined<U>(action: MapDefinedFunction<T, U>): Stream<U> {
    this.array = this.array.map(mapDefinedFn(action)) as any
    return this as any
  }

  mapUndefined<U>(action: MapUndefinedFunction<T, U>): Stream<U | T> {
    this.array = this.array.map(mapUndefinedFn(action)) as any
    return this as any
  }

  flat<U>(depth?: number): Stream<U> {
    this.array = this.array.map(flatMapFn).flat(depth)
    return this as any
  }

  flatMap<U>(action: FlatMapFunction<T, U>, depth?: number): Stream<U> {
    return this.map(action).flat(depth)
  }

  filterClass<U extends T>(type: ClassType<U>): Stream<U> {
    return this.filter(value => value instanceof type).map(value => value as U)
  }

  filter(predicate: SearchPredicate<T>): Stream<T> {
    this.array = this.array.filter((v, i, a) => predicate(v, i, ArrayList.from(a)))
    return this
  }

  filterPresent(): Stream<NonNullable<T>> {
    this.filter(TypeUtils.defined)
    return this as any
  }

  filterNotPresent(): Stream<undefined | null> {
    this.filter(TypeUtils.notDefined)
    return this as any
  }

  unique(equalityPredicate?: EqualityPredicate<T, T>): Stream<T> {
    const predicate = equalityPredicate || equalsBetween
    return new ListStream<T>(
      this.array.reduce(
        (acc, cur) =>
          acc.findIndex(i => predicate(i, cur)) > -1 ? acc : acc.concat([cur]),
        []
      )
    )
  }

  every(predicate: SearchPredicate<T>): boolean {
    return this.array.every((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  some(predicate: SearchPredicate<T>): boolean {
    return this.array.some((v, i, a) => predicate(v, i, ArrayList.from(a)))
  }

  none(predicate: SearchPredicate<T>): boolean {
    return !this.every(predicate)
  }

  findOrThrow(predicate: SearchPredicate<T>, exception: () => Error): T {
    const found = this.find(predicate)
    if (found !== undefined) return found
    throw exception()
  }

  find(predicate: SearchPredicate<T>): T | undefined {
    return this.array.find(predicateFn(predicate))
  }

  findIndex(predicate: SearchPredicate<T>): number {
    return this.array.findIndex(predicateFn(predicate))
  }

  findOptional(predicate: SearchPredicate<T>): Optional<T> {
    return Optional.nullable(this.find(predicate))
  }

  findFirst(): Optional<T> {
    if (this.array.length === 0) return Optional.empty()
    return Optional.of(this.array[0])
  }

  findLast(): Optional<T> {
    if (this.array.length === 0) return Optional.empty()
    this.reverse()
    return Optional.of(this.array[0])
  }

  count(predicate: SearchPredicate<T>): number {
    return this.filter(predicate).collect().size()
  }

  join(separator?: string): string {
    return this.array.join(separator)
  }

  reduce<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U {
    return this.array.reduce(reduceFn, initialValue)
  }

  reduceRight<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U {
    return this.array.reduceRight(reduceFn, initialValue)
  }

  collect(): List<T> {
    return ArrayList.from(this.array)
  }

  collectArray(): Array<T> {
    return [].concat(this.array)
  }

  log(
    identifier?: string | number,
    entryFormatter?: (entry: T, index: number, array: List<T>) => string
  ): Stream<T> {
    const id = identifier || "ListLog"
    if (this.array.length === 0) console.debug(id, "Empty")
    else if (entryFormatter)
      console.debug(
        id,
        this.array.map((e, i, a) => entryFormatter(e, i, ArrayList.from(a)))
      )
    else console.debug(id, this.array)
    return this
  }

  static of<T>(array: Array<T>) {
    return new ListStream(array)
  }
}
