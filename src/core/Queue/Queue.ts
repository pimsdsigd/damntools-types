import {List} from "../List"

export interface Queue<T> {

  push(...items: T[]): void;

  poll(): T;

  isEmpty(): boolean;

  hasElements(): boolean;

  pop(): void

  clear(): List<T>
}
