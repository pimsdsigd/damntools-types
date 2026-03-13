function formatMessage(message?: string | Error): string {
  if (typeof message === "string") {
    return message
  } else if (message instanceof Error) {
    return message.message
  }
  return "RuntimeError"
}

export class RuntimeError extends Error {
  private readonly reason: Error

  constructor()
  constructor(message: string)
  constructor(message: string, reason: Error)
  constructor(reason: Error)
  constructor(message?: string | Error, reason?: Error) {
    super(formatMessage(message))
    this.reason = reason
  }
}
