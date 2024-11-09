import {Tuple5} from "./Tuple5"
import {Tuple2} from "./Tuple2"
import {Tuple3} from "./Tuple3"
import {Tuple4} from "./Tuple4"

export class Tuples {
  public static quin<V1, V2, V3, V4, V5>(
    value1: V1,
    value2: V2,
    value3: V3,
    value4: V4,
    value5: V5
  ): Tuple5<V1, V2, V3, V4, V5> {
    // @ts-expect-error only exposed to this factory
    return new Tuple5(value1, value2, value3, value4, value5)
  }

  public static quad<V1, V2, V3, V4>(
    value1: V1,
    value2: V2,
    value3: V3,
    value4: V4
  ): Tuple4<V1, V2, V3, V4> {
    // @ts-expect-error only exposed to this factory
    return new Tuple4(value1, value2, value3, value4)
  }

  public static trio<V1, V2, V3>(value1: V1, value2: V2, value3: V3): Tuple3<V1, V2, V3> {
    // @ts-expect-error only exposed to this factory
    return new Tuple3(value1, value2, value3)
  }

  public static duo<V1, V2>(value1: V1, value2: V2): Tuple2<V1, V2> {
    // @ts-expect-error only exposed to this factory
    return new Tuple2(value1, value2)
  }
}
