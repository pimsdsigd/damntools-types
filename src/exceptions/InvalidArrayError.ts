export class InvalidArrayError extends Error {
  constructor(message?: string) {
    super(message || "Array is invalid !")
  }
}
