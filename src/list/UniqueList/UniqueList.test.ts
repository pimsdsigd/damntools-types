import {expect} from "chai"
import {UniqueList} from "./UniqueList"
import {InvalidArrayError} from "../../exceptions"

// @ts-ignore
const newArray = <T>(array?: any) => new UniqueList<T>(array)

describe("UniqueList", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      expect(newArray().size()).to.be.equals(0)
    })
    it("not an array throws", () => {
      expect(() => newArray(1)).to.throw(InvalidArrayError)
      expect(() => newArray(true)).to.throw(InvalidArrayError)
      expect(() => newArray({})).to.throw(InvalidArrayError)
      expect(newArray("").size()).to.be.eq(0)
    })
    it("array provided", () => {
      expect(newArray([1]).size()).to.be.equals(1)
    })
    it("array with doublons is unified", () => {
      expect(newArray([1, 1]).size()).to.be.equals(1)
    })
  })

  describe("push()", () => {
    it("not an array throws", () => {
      const array = new UniqueList([1, 23, 2, 3])
      expect(array.size()).to.be.equals(4)
      array.push(5)
      expect(array.size()).to.be.equals(5)
      array.push(23.0)
      expect(array.size()).to.be.equals(5)
      array.push(23.000000001)
      expect(array.size()).to.be.equals(6)
    })
  })
})
