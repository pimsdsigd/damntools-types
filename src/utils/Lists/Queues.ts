import {BasicQueue} from "../../list"

export class Queues {

  of<T>(...items: T[]){
    return new BasicQueue(items)
  }

}
