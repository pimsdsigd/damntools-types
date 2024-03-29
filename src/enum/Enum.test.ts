import {Enum} from "./Enum"
import {expect} from "chai"
import {InvalidEnumKey} from "../exceptions"

class SOME extends Enum<string> {
  static KEY1 = new SOME("key1")
  static KEY2 = new SOME("key2")
  static KEY3 = new SOME("key1")
}

class OTHER extends Enum<string> {
  static KEY1 = new OTHER("key1")
  static KEY2 = new OTHER("key2")
  static KEY3 = new OTHER("key1")
}

describe("Enum", () => {
  describe("constructor()", () => {
    it("without ordinal", () => {
      // @ts-ignore
      Enum.COUNTER.counter = 0

      class EE extends Enum<string> {
        static V1 = new EE("1")
      }

      expect(EE.V1.key()).to.be.equals("1")
      // @ts-ignore
      expect(Enum.COUNTER.counter).to.be.equals(1)
    })

    it("with ordinal", () => {
      // @ts-ignore
      Enum.COUNTER.counter = 0

      class EE extends Enum<string> {
        static V1 = new EE("1")
      }

      expect(EE.V1.key()).to.be.equals("1")
      // @ts-ignore
      expect(Enum.COUNTER.counter).to.be.equals(1)
    })
  })

  describe("fromValue()", () => {
    it("with found key", () => {
      const fromValue = SOME.fromValue<string, SOME>("key1")
      expect(fromValue).to.be.instanceof(SOME)
      expect(fromValue.key()).to.be.equals("key1")
    })
    it("with not found key throws", () => {
      expect(() => SOME.fromValue<string, SOME>("key3")).to.throw(InvalidEnumKey)
    })
    it("with undefined key throws", () => {
      expect(() => SOME.fromValue<string, SOME>(undefined)).to.throw(InvalidEnumKey)
      expect(() => SOME.fromValue<string, SOME>(null)).to.throw(InvalidEnumKey)
    })
  })

  describe("optionalFromValue()", () => {
    it("with found key", () => {
      const fromValue = SOME.optionalFromValue<string, SOME>("key1")
      expect(fromValue.isPresent()).to.be.true
      expect(fromValue.get()).to.be.instanceof(SOME)
      expect(fromValue.get().key()).to.be.equals("key1")
    })
    it("with not found key throws", () => {
      const fromValue = SOME.optionalFromValue<string, SOME>("key3")
      expect(fromValue.isEmpty()).to.be.true
    })
    it("with undefined key throws", () => {
      expect(() => SOME.optionalFromValue<string, SOME>(undefined)).to.throw(
        InvalidEnumKey
      )
      expect(() => SOME.optionalFromValue<string, SOME>(null)).to.throw(InvalidEnumKey)
    })
  })

  describe("all()", () => {
    it("returns all enums", () => {
      const fromValue = SOME.all<SOME>()
      expect(fromValue.size()).to.be.equals(3)
    })
  })

  describe("equals()", () => {
    it("returns true when equals", () => {
      expect(SOME.KEY1.equals(SOME.KEY1)).to.be.true
      expect(SOME.KEY1.equals(SOME.KEY3)).to.be.true
    })
    it("returns false when not equals", () => {
      expect(SOME.KEY1.equals(SOME.KEY2)).to.be.false
      expect(SOME.KEY3.equals(SOME.KEY2)).to.be.false
      expect(SOME.KEY1.equals(undefined)).to.be.false
    })
    it("returns false when key equals but not type", () => {
      expect(SOME.KEY1.equals(OTHER.KEY1)).to.be.false
    })
  })
})
