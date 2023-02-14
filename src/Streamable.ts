export interface Streamable<T> {
	get(index: number): T | undefined;

	push(...items: Array<T>): Streamable<T>;

	concat(...items: Array<T>): Streamable<T>;

	reduce<U>(
		callbackFn: (
			previousValue: U,
			currentValue: T,
			currentIndex?: number,
			array?: T[]
		) => U,
		initialValue: U
	): U;

	reduceRight<U>(
		callbackFn: (
			previousValue: U,
			currentValue: T,
			currentIndex?: number,
			array?: T[]
		) => U,
		initialValue: U
	): U;

	reverse(): Streamable<T>;

	sort(compareFn?: (a: T, b: T) => number): Streamable<T>;

	join(separator?: string): string;

	first(): T | undefined;

	last(): T | undefined;

	shift(): Streamable<T>;

	unshift(...items: Array<T>): Streamable<T>;

	pop(): Streamable<T>;

	collect(): Array<T>;

	slice(start: number, end: number): Streamable<T>;

	splice(start: number, deleteCount?: number, ...items: T[]): Streamable<T>;

	peek(
		action: (value: T, index?: number, array?: Array<T>) => void
	): Streamable<T>;

	peekPresent(
		action: (value: T, index?: number, arr?: Array<T>) => void
	): Streamable<T>;

	forEach(
		action: (value: T, index?: number, arr?: Array<T>) => void
	): Streamable<T>;

	map<U>(
		action: (value: T, index?: number, arr?: Array<T>) => U
	): Streamable<U>;

	mapDefined<U>(
		action: (value: T, index?: number, arr?: Array<T>) => U | undefined
	): Streamable<U>;

	mapUndefined<U>(
		action: (value: T, index?: number, array?: Array<T>) => U | T
	): Streamable<U | T>;

	filter(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): Streamable<T>;

	filterPresent(): Streamable<T>;

	filterNotPresent(): Streamable<T>;

	every(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): boolean;

	some(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): boolean;

	none(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): boolean;

	findOrThrow(
		predicate: (value: T, index: number, array: Array<T>) => boolean,
		exception: () => Error
	): T;

	find(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): T | undefined;

	findIndex(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): number;

	count(
		predicate: (value: T, index: number, array: Array<T>) => boolean
	): number;

	size(): number;

	unique(equalityPredicate: (a: T, b: T) => boolean): Streamable<T>;

	equals<O>(
		other: Array<O | T> | Streamable<O | T>,
		equalityPredicate: (a: O | T, b: O | T) => boolean
	): boolean;
}

