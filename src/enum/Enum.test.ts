import {Enum} from "./Enum"
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
      // @ts-expect-error
      Enum.COUNTER.counter = 0

      class EE extends Enum<string> {
        static V1 = new EE("1")
      }

      expect(EE.V1.key()).toBe("1")
      // @ts-expect-error
      expect(Enum.COUNTER.counter).toBe(1)
    })

    it("with ordinal", () => {
      // @ts-expect-error
      Enum.COUNTER.counter = 0

      class EE extends Enum<string> {
        static V1 = new EE("1")
      }

      expect(EE.V1.key()).toBe("1")
      // @ts-expect-error
      expect(Enum.COUNTER.counter).toBe(1)
    })
  })

  describe("fromValue()", () => {
    it("with found key", () => {
      const fromValue = SOME.fromValue<string, SOME>("key1")
      expect(fromValue).toBeInstanceOf(SOME)
      expect(fromValue.key()).toBe("key1")
    })
    it("with not found key throws", () => {
      expect(() => SOME.fromValue<string, SOME>("key3")).toThrow(InvalidEnumKey)
    })
    it("with undefined key throws", () => {
      expect(() => SOME.fromValue<string, SOME>(undefined)).toThrow(InvalidEnumKey)
      expect(() => SOME.fromValue<string, SOME>(null)).toThrow(InvalidEnumKey)
    })
  })

  describe("optionalFromValue()", () => {
    it("with found key", () => {
      const fromValue = SOME.optionalFromValue<string, SOME>("key1")
      expect(fromValue.isPresent()).toBeTruthy()
      expect(fromValue.get()).toBeInstanceOf(SOME)
      expect(fromValue.get().key()).toBe("key1")
    })
    it("with not found key throws", () => {
      const fromValue = SOME.optionalFromValue<string, SOME>("key3")
      expect(fromValue.isEmpty()).toBeTruthy()
    })
    it("with undefined key throws", () => {
      expect(() => SOME.optionalFromValue<string, SOME>(undefined)).toThrow(
        InvalidEnumKey
      )
      expect(() => SOME.optionalFromValue<string, SOME>(null)).toThrow(InvalidEnumKey)
    })
  })

  describe("all()", () => {
    it("returns all enums", () => {
      const fromValue = SOME.all<SOME>()
      expect(fromValue.size()).toBe(3)
    })
  })

  describe("equals()", () => {
    it("returns true when equals", () => {
      expect(SOME.KEY1.equals(SOME.KEY1)).toBeTruthy()
      expect(SOME.KEY1.equals(SOME.KEY3)).toBeTruthy()
    })
    it("returns false when not equals", () => {
      expect(SOME.KEY1.equals(SOME.KEY2)).toBe(false)
      expect(SOME.KEY3.equals(SOME.KEY2)).toBe(false)
      expect(SOME.KEY1.equals(undefined)).toBe(false)
    })
    it("returns false when key equals but not type", () => {
      expect(SOME.KEY1.equals(OTHER.KEY1)).toBe(false)
    })
  })
})
