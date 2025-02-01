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


class MyConcreteClassFrom extends MyAbstractClassWithCtor {
}

class MyConcreteClassFromSub extends MyConcreteClassFrom {
}


class MyClassWithCtor {

  key3: string

  constructor() {
    this.key3 = ""
  }

  met() {
    return true
  }
}

describe("TypeUtils", () => {

  describe("subClassOf", () => {
    it("same parameter should return false", () => {
      expect(TypeUtils.subClassOf(MyConcreteClass, MyConcreteClass))
        .toBeFalsy()
    })
    it("unrelated native parameter should return false", () => {
      expect(TypeUtils.subClassOf(Number, MyConcreteClass))
        .toBeFalsy()
    })
    it("unrelated parameter should return false", () => {
      expect(TypeUtils.subClassOf(MyClassWithCtor, MyConcreteClass))
        .toBeFalsy()
    })
    it("same abstract parameter should return false", () => {
      expect(TypeUtils.subClassOf(MyAbstractClass, MyAbstractClass))
        .toBeFalsy()
    })
    it("subclass of expected should return true", () => {
      expect(TypeUtils.subClassOf(MyConcreteClass, MyAbstractClass))
        .toBeTruthy()
    })
    it("subclass of subclass of expected should return true", () => {
      expect(TypeUtils.subClassOf(MyConcreteClassFromSub, MyAbstractClassWithCtor))
        .toBeTruthy()
    })
    it("parent of expected should return false", () => {
      expect(TypeUtils.subClassOf(MyConcreteClass, MyConcreteClassFromSub))
        .toBeFalsy()
    })
    it("function should return false", () => {
      expect(TypeUtils.subClassOf(Function, MyAbstractClass))
        .toBeFalsy()
    })
    it("object should return false", () => {
      expect(TypeUtils.subClassOf(new MyConcreteClass() as any, MyAbstractClass))
        .toBeFalsy()
    })
    it("any of Object should return true", () => {
      expect(TypeUtils.subClassOf(MyConcreteClass, Object))
        .toBeTruthy()
    })
    it("object of object should return false", () => {
      expect(TypeUtils.subClassOf({} as any, Object))
        .toBeFalsy()
    })
  })
})
