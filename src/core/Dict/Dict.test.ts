import {isDict} from "./Dict"
import {StaticKV} from "../../dict"

describe("Dict", () => {
  describe("isDict()", () => {
    it("undefined returns false", () => {
      expect(isDict(undefined)).toBeFalsy()
    })
    it("array returns false", () => {
      expect(isDict(["a"])).toBeFalsy()
    })
    it("object returns false", () => {
      expect(isDict({a: () => ({})})).toBeFalsy()
    })
    it("sub returns true", () => {
      expect(isDict(StaticKV.empty())).toBeTruthy()
    })
    it("other returns false", () => {
      expect(isDict(1)).toBeFalsy()
      expect(isDict("")).toBeFalsy()
      expect(isDict("1")).toBeFalsy()
    })
  })
})
