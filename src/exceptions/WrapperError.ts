
export class WrapperError extends Error {
  private readonly _reason: Error;

  constructor(reason: Error, message?: string) {
    super(message)
    this._reason = reason
  }

  reason(){
    return this._reason
  }
}
