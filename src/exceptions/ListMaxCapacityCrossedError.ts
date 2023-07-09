export class ListMaxCapacityCrossedError extends Error {
  constructor(capacity: number, size: number, insertSize: number) {
    super(
      `List max capacity of ${capacity} would have been crossed ! (insertSize: ${insertSize}, listSize: ${size}`
    )
  }
}
