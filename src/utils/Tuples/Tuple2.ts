import {List, Optionable} from "../../core"
import {Optional} from "../../optional"
import {AbstractTuple} from "./AbstractTuple"
import {Lists} from "../Lists";

export class Tuple2<V1, V2> implements AbstractTuple {
  private readonly _value1: V1
  private readonly _value2: V2

  protected constructor(value1: V1, value2: V2) {
    this._value1 = value1
    this._value2 = value2
  }

  getCount(): number {
    return 2
  }
  asList(): List<any> {
    return Lists.of<any>(this._value1, this._value2)
  }

  public getV1(): V1 {
    return this._value1
  }

  public getV1Optional(): Optionable<V1> {
    return Optional.nullable(this._value1)
  }

  public getV2(): V2 {
    return this._value2
  }

  public getV2Optional(): Optionable<V2> {
    return Optional.nullable(this._value2)
  }
}
