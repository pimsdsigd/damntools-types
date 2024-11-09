import {List} from "../../core";

export interface AbstractTuple {
  getCount(): number;

  asList(): List<any>
}
