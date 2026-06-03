import {abstractArrayToArray, AbstractedArray, notDefined, Stream} from "../../core"
import {ListStream} from "../../stream"

export abstract class Streams {
  static from<T>(array: AbstractedArray<T>): Stream<T> {
    const arr = abstractArrayToArray(array)
    return new ListStream(arr)
  }

  static concat<T>(...streams: Stream<T>[]): Stream<T> {
    if (notDefined(streams)) streams = []
    return streams.reduce((o, c) => {
      return o.concat(c)
    }, Streams.from<T>([]))
  }
}
