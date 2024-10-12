import {
  ClassType,
  compare,
  concatArray,
  copyArrayInstance,
  defined,
  EqualityPredicate,
  equals,
  FlatMapFunction,
  isList,
  MapDefinedFunction,
  MapFunction,
  MapUndefinedFunction,
  notDefined,
  Optionable,
  PeekFunction,
  ReducerFunction,
  SearchPredicate,
  SearchPredicateNarrowing,
  SortFunction,
  Stream,
  StreamCollector
} from "../../core"
import {Optional} from "../../optional"
import {Streams} from "../../utils";

const mapFn =
  <T>(action) =>
  (value, index, arr): T =>
    action(value, index, arr)
const mapDefinedFn = action => (value, index, arr) =>
  defined(value) ? action(value, index, arr) : value

const mapUndefinedFn = action => (value, index, arr) =>
  notDefined(value) ? action(index, arr) : value

const flatMapFn = item => {
  if (isList(item)) return item.getInner()
  return item
}

const predicateFn = predicate => (v, i, a) => predicate(v, i, a)

export class ListStream<T> implements Stream<T> {
  private readonly array: Array<T>

  constructor(array?: Array<T>) {
    this.array = array || []
  }

  concat(stream: Stream<T>): Stream<T> {
    return new ListStream(concatArray(copyArrayInstance(this.array), stream.collectArray()))
  }

  reverse(): Stream<T> {
    return new ListStream(copyArrayInstance(this.array).reverse())
  }

  sort(compareFn?: SortFunction<T>): Stream<T> {
    return new ListStream(copyArrayInstance(this.array).sort(compareFn))
  }

  sortWith(key: keyof T): Stream<T> {
    return new ListStream<T>(
      copyArrayInstance(this.array).sort((a, b) => compare(a[key], b[key]))
    )
  }

  peek(action: PeekFunction<T>): Stream<T> {
    const stream = new ListStream(copyArrayInstance(this.array))
    for (let i = 0; i < stream.array.length; i++) {
      action(stream.array[i], i, stream.array)
    }
    return stream
  }

  peekDefined(action: PeekFunction<T>): Stream<T> {
    const stream = new ListStream(copyArrayInstance(this.array))
    for (let i = 0; i < stream.array.length; i++) {
      const v = stream.array[i]
      if (!!v || v === 0 || v === false || v === "") action(v, i, stream.array)
    }
    return stream
  }

  map<U>(action: MapFunction<T, U>): Stream<U> {
    const array = this.array.map<U>(mapFn(action))
    return new ListStream<U>(array)
  }

  mapDefined<U>(action: MapDefinedFunction<T, U>): Stream<U> {
    const array = this.array.map<U>(mapDefinedFn(action))
    return new ListStream<U>(array)
  }

  mapUndefined(action: MapUndefinedFunction<T>): Stream<T> {
    const array = this.array.map<T>(mapUndefinedFn(action))
    return new ListStream(array)
  }

  flat<U>(depth?: number): Stream<U> {
    const array = this.array.map(flatMapFn).flat(depth)
    return new ListStream<U>(array)
  }

  flatMap<U>(action: FlatMapFunction<T, U>, depth?: number): Stream<U> {
    return this.map(action).flat(depth)
  }

  filter<X extends T>(predicate: SearchPredicateNarrowing<T, X>): Stream<X> {
    const array = this.array.filter(predicate)
    return new ListStream<X>(array as any)
  }

  filterClass<U extends T>(...types: Array<ClassType<U>>): Stream<U> {
    if (types.length === 0) return new ListStream<U>()
    return this.filter((c): c is U => types.findIndex(t => c instanceof t) > -1)
  }

  filterPresent(): Stream<NonNullable<T>> {
    return this.filter(defined)
  }

  unique(equalityPredicate?: EqualityPredicate<T, T>): Stream<T> {
    const predicate = equalityPredicate || equals
    return new ListStream<T>(
      this.array.reduce(
        (acc, cur) =>
          acc.findIndex(i => predicate(i, cur)) > -1 ? acc : acc.concat([cur]),
        []
      )
    )
  }

  every(predicate: SearchPredicate<T>): boolean {
    if( this.array.length === 0)
      return false
    return this.array.every((v, i, a) => predicate(v, i, a))
  }

  some(predicate: SearchPredicate<T>): boolean {
    if( this.array.length === 0)
      return false
    return this.array.some((v, i, a) => predicate(v, i, a))
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

  findOptional(predicate: SearchPredicate<T>): Optionable<T> {
    return Optional.nullable(this.find(predicate))
  }

  findFirst(predicate?: SearchPredicate<T>): Optionable<T> {
    if (this.array.length === 0) return Optional.empty()
    if (predicate) {
      for (let i = 0; i < this.array.length; i++) {
        const v = this.array[i]
        if (predicate(v)) {
          return Optional.of(v)
        }
      }
      return Optional.empty()
    } else {
      return Optional.of(this.array[0])
    }
  }

  findFirstIndex(predicate?: SearchPredicate<T>): number {
    if (this.array.length === 0) return -1
    if (predicate) return this.findIndex((v, i, a): v is T => predicate(v, i, a))
    else {
      return -1
    }
  }

  findLast(predicate?: SearchPredicate<T>): Optionable<T> {
    if (this.array.length === 0) return Optional.empty()
    if (predicate) {
      const length = this.array.length
      for (let i = length - 1; i >= 0; i--) {
        const v = this.array[i]
        if (predicate(v)) {
          return Optional.of(v)
        }
      }
      return Optional.empty()
    } else {
      return Optional.of(this.array[this.array.length - 1])
    }
  }

  findLastIndex(predicate?: SearchPredicate<T>): number {
    if (this.array.length === 0) return -1
    if (predicate) {
      const array = this.collectArray()
      array.reverse()
      const index = new ListStream(array).findIndex(predicate)
      return index === -1 ? index : this.array.length - 1 - index
    } else {
      return -1
    }
  }

  count(predicate?: SearchPredicate<T>): number {
    if (!predicate) return this.array.length
    return this.filter((v, i, a): v is T => predicate(v, i, a)).collectArray().length
  }

  countNotPresent(): number {
    return this.filter(notDefined).count()
  }

  join(separator?: string): string {
    return this.array.join(separator)
  }

  reduce<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U {
    let other = initialValue
    for (let i = 0; i < this.array.length; i++) {
      other = callbackFn(other, this.array[i])
    }
    return other
  }

  reduceRight<U>(callbackFn: ReducerFunction<T, U>, initialValue: U): U {
    let other = initialValue
    for (let i = this.array.length - 1; i >= 0; i--) {
      other = callbackFn(other, this.array[i])
    }
    return other
  }

  collect<R>(collector: StreamCollector<T, R>): R {
    return collector(this.array)
  }

  collectArray(): Array<T> {
    return copyArrayInstance(this.array)
  }

  log(
    identifier?: string | number,
    entryFormatter?: (entry: T, index: number, array: Array<T>) => string
  ): Stream<T> {
    const id = identifier || "ListLog"
    if (this.array.length === 0) console.debug(id, "Empty")
    else if (entryFormatter)
      console.debug(
        id,
        this.array.map((e, i, a) => entryFormatter(e, i, a))
      )
    else console.debug(id, this.array)
    return this
  }
}
