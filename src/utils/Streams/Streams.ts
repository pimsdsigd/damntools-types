import {abstractArrayToArray, AbstractedArray, Stream} from "../../core"
import {ListStream} from "../../stream"

export abstract class Streams {
  static from<T>(array: AbstractedArray<T>): Stream<T> {
    const arr = abstractArrayToArray(array)
    return new ListStream(arr)
  }
}
