import {ArrayList} from "./list"
import {
  EmptyOptionalAccessError,
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "./exceptions"
import {Optional} from "./optional"
import {KeyValue, UnmodifiableKeyValue} from "./dict";
import {DictUtils} from "./DictUtils";

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

export {
  Optional,
  ArrayList,
  UnmodifiableKeyValue,
  DictUtils,
  KeyValue,
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError,
  InvalidIndexError,
  IndexOutOfBoundError,
  EmptyOptionalAccessError
}
