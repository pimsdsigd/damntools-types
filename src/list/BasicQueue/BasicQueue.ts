import {List, Queue} from "../../core"
import {QueueEmptyError} from "../../exceptions"
import {ArrayList} from "../ArrayList"

export class BasicQueue<T> implements Queue<T> {
  private readonly maxSize: number
  private readonly queue: List<T>

  constructor()
  constructor(array: T[])
  constructor(maxSize: number)
  constructor(array?: number | T[], maxSize?: number) {
    if (typeof array === "number") {
      this.maxSize = Math.min(array || Number.MAX_VALUE, Number.MAX_VALUE)
    } else if (Array.isArray(maxSize)) {
      this.queue = new ArrayList(array)
      if (typeof maxSize === "number") {
        this.maxSize = Math.min(maxSize || Number.MAX_VALUE, Number.MAX_VALUE)
      }
    } else {
      this.maxSize = Number.MAX_VALUE
      this.queue = new ArrayList()
    }
  }

  hasElements(): boolean {
    return this.queue.hasElements()
  }

  isEmpty(): boolean {
    return this.queue.isEmpty()
  }

  poll(): T {
    if (this.queue.hasElements()) {
      const get = this.queue.get(0)
      this.queue.remove(0)
      return get
    }
    throw new QueueEmptyError()
  }

  push(...items: T[]): void {
    this.queue.push(...items)
  }

  pop(): T {
    if (this.queue.hasElements()) {
      const index = this.queue.size() - 1
      const get = this.queue.get(index)
      this.queue.remove(index)
      return get
    }
  }

  clear(): List<T> {
    const queue = this.queue.copy()
    this.queue.clear()
    return queue
  }
}
