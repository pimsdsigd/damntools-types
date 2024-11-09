import {List, Optionable} from "../../core"
import {Optional} from "../../optional"
import {Tuple4} from "./Tuple4"
import {Lists} from "../Lists"

export class Tuple5<V1, V2, V3, V4, V5> extends Tuple4<V1, V2, V3, V4> {
  private readonly _value5: V5

  protected constructor(value1: V1, value2: V2, value3: V3, value4: V4, value5: V5) {
    super(value1, value2, value3, value4)
    this._value5 = value5
  }

  getCount(): number {
    return 5
  }

  asList(): List<any> {
    return Lists.of<any>(
      this.getV1(),
      this.getV2(),
      this.getV3(),
      this.getV4(),
      this._value5
    )
  }

  public getV5(): V5 {
    return this._value5
  }

  public getV5Optional(): Optionable<V5> {
    return Optional.nullable(this._value5)
  }
}
