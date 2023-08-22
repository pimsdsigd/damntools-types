import {ObjectUtils} from "./src"

const obj = {
  a: 5,
  b: {
    b1: {
      bb: true
    },
    b2: "51"
  }
}

console.log(obj)
ObjectUtils.pathModifier(obj, "a", {bc: 645})
ObjectUtils.pathModifier(obj, "b", 2)
console.log(obj)
