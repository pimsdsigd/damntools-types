import {List} from "../../src"
import {expect} from "chai"
import {Collectable} from "../../src/Collectable"

abstract class ParentClass {
  value: number

  method() {
    return null
  }
}

class ChildClass1 extends ParentClass {
  yolo: number
}

function test(v?, p?):  undefined {
  return v && p ?undefined : undefined
}

function test2(): ChildClass1 {
  return new ChildClass1()
}

describe("List.itemPolymorphism", () => {
  describe("constructor()", () => {
    it("with undefined array create new array", () => {
      const a = test(),
        b = test2()
      const l = List.of(a, b)
      expect(l.size()).to.equals(2)
    })
  })
})
