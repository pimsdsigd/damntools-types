
export class WrapperError extends Error {
  private readonly _reason: Error | undefined;

  constructor(message?: string, reason?: Error | undefined) {
    super(message)
    this._reason = reason
  }

  reason(){
    return this._reason
  }
}
