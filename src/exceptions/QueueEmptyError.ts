export class QueueEmptyError extends Error {
  constructor(message?: string) {
    super(message || "Queue is empty !")
  }
}
