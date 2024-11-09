import {List, Optionable} from "../../core"
import {Optional} from "../../optional"
import {Tuple2} from "./Tuple2"
import {Lists} from "../Lists"

export class Tuple3<V1, V2, V3> extends Tuple2<V1, V2> {
  private readonly _value3: V3

  protected constructor(value1: V1, value2: V2, value3: V3) {
    super(value1, value2)
    this._value3 = value3
  }

  getCount(): number {
    return 3
  }

  asList(): List<any> {
    return Lists.of<any>(this.getV1(), this.getV2(), this._value3)
  }

  public getV3(): V3 {
    return this._value3
  }

  public getV3Optional(): Optionable<V3> {
    return Optional.nullable(this._value3)
  }
}
