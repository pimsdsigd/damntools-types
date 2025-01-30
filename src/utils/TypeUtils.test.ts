import {TypeUtils} from "./TypeUtils";

abstract class MyAbstractClass {
  key1: string
}

abstract class MyAbstractClassWithCtor {
  key2: string

  constructor() {
    this.key2 = ""
  }
}

class MyConcreteClass extends MyAbstractClass {
  key1_1: string
}

class MyConcreteClassWithCtor extends MyAbstractClass {
  key1_2: string

  constructor() {
    super()
    this.key1_2 = ""
  }
}

class MyConcreteClassWithCtorFrom extends MyAbstractClassWithCtor {
  key2_1: string

  constructor() {
    super()
    this.key2_1 = ""
  }
}

class MyConcreteClassFrom extends MyAbstractClassWithCtor {
}

describe("TypeUtils", () => {

  describe("isClass", () => {

    it("abstract should return false", () => {
      expect(TypeUtils.isClass(MyAbstractClassWithCtor)).toBeFalsy()
      expect(TypeUtils.isClass(MyAbstractClass)).toBeFalsy()
    })

    it("class should return true", () => {
      expect(TypeUtils.isClass(MyConcreteClass)).toBeTruthy()
      expect(TypeUtils.isClass(MyConcreteClassFrom)).toBeTruthy()
      expect(TypeUtils.isClass(MyConcreteClassWithCtor)).toBeTruthy()
      expect(TypeUtils.isClass(MyConcreteClassWithCtorFrom)).toBeTruthy()
    })

    it("instance should return false", () => {
      // @ts-ignore
      expect(TypeUtils.isClass(new MyConcreteClassWithCtor())).toBeFalsy()
    })

  })
})
