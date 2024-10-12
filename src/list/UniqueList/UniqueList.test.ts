import {UniqueList} from "./UniqueList"
import {InvalidArrayError} from "../../exceptions"

const newArray = <T>(array?: any) => new UniqueList<T>(array)

describe("UniqueList", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      expect(newArray().size()).toBe(0)
    })
    it("not an array throws", () => {
      expect(() => newArray(1)).toThrow(InvalidArrayError)
      expect(() => newArray(true)).toThrow(InvalidArrayError)
      expect(() => newArray({})).toThrow(InvalidArrayError)
      expect(newArray("").size()).toBe(0)
    })
    it("array provided", () => {
      expect(newArray([1]).size()).toBe(1)
    })
    it("array with doublons is unified", () => {
      expect(newArray([1, 1]).size()).toBe(1)
    })
  })

  describe("push()", () => {
    it("not an array throws", () => {
      const array = new UniqueList([1, 23, 2, 3])
      expect(array.size()).toBe(4)
      array.push(5)
      expect(array.size()).toBe(5)
      array.push(23.0)
      expect(array.size()).toBe(5)
      array.push(23.000000001)
      expect(array.size()).toBe(6)
    })
  })
})
