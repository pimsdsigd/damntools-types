import {BasicQueue} from "../../list"
import {Queue} from "../../core"

export class Queues {
  public of<T>(...items: T[]): Queue<T> {
    return new BasicQueue(items)
  }
}
