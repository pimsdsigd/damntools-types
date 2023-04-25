export class UndefinedError extends Error {
  constructor(message?: string) {
    super(message || "Variable should be defined !")
  }
}
