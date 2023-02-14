export class IndexOutOfBoundError extends Error {
	constructor(index: number, end: number) {
		super(`Index ${index} is out of bound (${end}) !`)
	}
}
