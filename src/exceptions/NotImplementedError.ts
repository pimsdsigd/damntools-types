export class NotImplementedError extends Error {
  constructor(...argSink: any) {
    super(
      "Not implemented !" +
        (argSink && typeof argSink[0] === "string" ? " " + argSink[0] : "")
    )
  }
}
