import {expect} from "chai"
import {isDict} from "./Dict"

describe("Dict", () => {
  describe("isDict()", () => {
    it("undefined returns false", () => {
      expect(isDict(undefined)).to.be.false
    })
    it("array returns false", () => {
      expect(isDict(["a"])).to.be.false
    })
    it("object returns false", () => {
      expect(isDict({a: () => ({})})).to.be.false
    })
    it("sub returns true", () => {
      expect(
        isDict({
          collect: () => ({}),
          entries: () => ({})
        })
      ).to.be.true
    })
    it("other returns false", () => {
      expect(isDict(1)).to.be.false
      expect(isDict("")).to.be.false
      expect(isDict("1")).to.be.false
    })
  })
})
