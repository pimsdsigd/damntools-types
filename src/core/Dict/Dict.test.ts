import {expect} from "chai"
import {isDict} from "./Dict"
import {StaticKV} from "../../dict"

describe("Dict", () => {
  describe("isDict()", () => {
    it("undefined returns false", () => {
      expect(isDict(undefined)).to.not.be.ok
    })
    it("array returns false", () => {
      expect(isDict(["a"])).to.not.be.ok
    })
    it("object returns false", () => {
      expect(isDict({a: () => ({})})).to.not.be.ok
    })
    it("sub returns true", () => {
      expect(isDict(StaticKV.empty())).to.be.ok
    })
    it("other returns false", () => {
      expect(isDict(1)).to.not.be.ok
      expect(isDict("")).to.not.be.ok
      expect(isDict("1")).to.not.be.ok
    })
  })
})
