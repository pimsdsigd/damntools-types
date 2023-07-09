export class InvalidIndexError extends Error {
  constructor(message?: string) {
    super(message || "Index is invalid !")
  }
}
