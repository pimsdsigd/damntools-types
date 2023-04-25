export class IllegalAccessError extends Error {
  constructor(message?: string) {
    super(message || "Illegal access !")
  }
}
