import {ArrayList} from "./list"
import {Optional} from "./optional"
import {KeyValue, UnmodifiableKeyValue} from "./dict";
import {DictUtils} from "./DictUtils";
import {TypeUtils} from "./types";
import {Enum} from "./enum";


Object.defineProperty(Array.prototype, "toList", {
  value: function () {
    return ArrayList.from(this)
  },
  configurable: true
})

Object.defineProperty(Object.prototype, "toKeyValue", {
  value: function () {
    return KeyValue.from(this)
  },
  configurable: true
})

export * from "./exceptions"

export {
  Enum,
  Optional,
  ArrayList,
  KeyValue,
  UnmodifiableKeyValue,
  DictUtils,
  TypeUtils
}
