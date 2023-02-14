import {Streamable} from "./Streamable";

export abstract class AStreamable<T> implements Streamable<T> {

	abstract collect(): Array<T>;

	abstract concat(...items: Array<T>): Streamable<T>;

	abstract count(predicate: (value: T, index: number, array: Array<T>) => boolean): number;

	abstract equals<O>(other: Array<O | T> | Streamable<O | T>, equalityPredicate: (a: (O | T), b: (O | T)) => boolean): boolean;

	abstract every(predicate: (value: T, index: number, array: Array<T>) => boolean): boolean;

	abstract filter(predicate: (value: T, index: number, array: Array<T>) => boolean): Streamable<T>;

	abstract filterNotPresent(): Streamable<T>;

	abstract filterPresent(): Streamable<T>;

	abstract find(predicate: (value: T, index: number, array: Array<T>) => boolean): T | undefined;

	abstract findIndex(predicate: (value: T, index: number, array: Array<T>) => boolean): number;

	abstract findOrThrow(predicate: (value: T, index: number, array: Array<T>) => boolean, exception: () => Error): T;

	abstract first(): T | undefined;

	abstract forEach(action: (value: T, index?: number, arr?: Array<T>) => void): Streamable<T>;

	abstract get(index: number): T | undefined;

	abstract join(separator?: string): string;

	abstract last(): T | undefined;

	abstract map<U>(action: (value: T, index?: number, arr?: Array<T>) => U): Streamable<U>;

	abstract mapDefined<U>(action: (value: T, index?: number, arr?: Array<T>) => (U | undefined)): Streamable<U>;

	abstract mapUndefined<U>(action: (value: T, index?: number, array?: Array<T>) => (U | T)): Streamable<U | T>;

	abstract none(predicate: (value: T, index: number, array: Array<T>) => boolean): boolean;

	abstract peek(action: (value: T, index?: number, array?: Array<T>) => void): Streamable<T>;

	abstract peekPresent(action: (value: T, index?: number, arr?: Array<T>) => void): Streamable<T>;

	abstract pop(): Streamable<T>;

	abstract push(...items: Array<T>): Streamable<T>;

	abstract reduce<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex?: number, array?: T[]) => U, initialValue: U): U;

	abstract reduceRight<U>(callbackFn: (previousValue: U, currentValue: T, currentIndex?: number, array?: T[]) => U, initialValue: U): U;

	abstract reverse(): Streamable<T>;

	abstract shift(): Streamable<T>;

	abstract size(): number;

	abstract slice(start: number, end: number): Streamable<T>;

	abstract some(predicate: (value: T, index: number, array: Array<T>) => boolean): boolean;

	abstract sort(compareFn?: (a: T, b: T) => number): Streamable<T>;

	abstract splice(start: number, deleteCount?: number, ...items: T[]): Streamable<T>;

	abstract unique(equalityPredicate: (a: T, b: T) => boolean): Streamable<T>;

	abstract unshift(...items: Array<T>): Streamable<T>;
}
