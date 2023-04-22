import {List} from "./list"
import {
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "./exceptions"

Object.defineProperty(Array.prototype, 'toList', {
  value: function () {
    return List.from(this)
  },
  configurable: true
});


export {
  List,
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError
}
