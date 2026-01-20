import {List, Queue} from "../../core"
import {QueueEmptyError} from "../../exceptions"
import {ArrayList} from "../ArrayList"

export class BasicQueue<T> implements Queue<T> {
  private readonly maxSize: number
  private readonly queue: List<T>

  constructor(maxSize?: number) {
    this.maxSize = Math.min(maxSize || Number.MAX_VALUE, Number.MAX_VALUE)
    this.queue = new ArrayList()
  }

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
