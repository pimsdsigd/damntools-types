
export class NotAnOptionalError extends Error {
  constructor() {
    super("Value is not an optional !")
  }
}
