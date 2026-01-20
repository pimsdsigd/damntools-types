import {List, Queue} from "../../core"
import {QueueEmptyError} from "../../exceptions"

export class BasicQueue<T> implements Queue<T> {
  private readonly maxSize: number
  private readonly queue: List<T>

  hasElements(): boolean {
    return this.queue.hasElements()
  }

  isEmpty(): boolean {
    return this.queue.isEmpty()
  }

  poll(): T {
    if (this.queue.hasElements()) {
      return this.queue.get(0)
    }
    throw new QueueEmptyError()
  }

  push(...items: T[]): void {
    this.queue.push(...items)
  }

  pop(): void {
    if (this.queue.hasElements()) {
      this.queue.remove(this.queue.size() - 1)
    }
  }

  clear(): List<T> {
    const queue = this.queue.copy()
    this.queue.clear()
    return queue
  }
}
