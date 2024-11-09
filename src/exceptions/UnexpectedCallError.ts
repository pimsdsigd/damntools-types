export class UnexpectedCallError extends Error {

  constructor() {
    super("Should not have been called");
  }
}
