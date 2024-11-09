import {List, Optionable} from "../../core"
import {Optional} from "../../optional"
import {Tuple3} from "./Tuple3"
import {Lists} from "../Lists";

export class Tuple4<V1, V2, V3, V4> extends Tuple3<V1, V2, V3> {
  private readonly _value4: V4

  protected constructor(value1: V1, value2: V2, value3: V3, value4: V4) {
    super(value1, value2, value3)
    this._value4 = value4
  }

  getCount(): number {
    return 4
  }

  asList(): List<any> {
    return Lists.of<any>(this.getV1(), this.getV2(), this.getV3(), this._value4)
  }

  public getV4(): V4 {
    return this._value4
  }

  public getV4Optional(): Optionable<V4> {
    return Optional.nullable(this._value4)
  }
}
