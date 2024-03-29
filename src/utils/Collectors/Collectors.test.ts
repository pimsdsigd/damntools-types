import {expect} from "chai"
import {Lists} from "../Lists";
import {Collectors} from "./Collectors";

describe("Collectors", () => {
  describe("joining", () => {
    it("correctly join non unique list", () => {
      const arr = Lists.of(1, 2, 3).stream().collect(Collectors.joining("TT"))
      expect(arr.get(0)).to.be.equals(1)
      expect(arr.get(1)).to.be.equals("TT")
      expect(arr.get(2)).to.be.equals(2)
      expect(arr.get(3)).to.be.equals("TT")
      expect(arr.get(4)).to.be.equals(3)
      expect(arr.size()).to.be.equals(5)
    })
    it("corectly joins unique list", () => {
      const arr = Lists.of(1).stream().collect(Collectors.joining("TT"))
      expect(arr.get(0)).to.be.equals(1)
      expect(arr.size()).to.be.equals(1)
    })
    it("correctly join non unique list with function sep", () => {
      const arr = Lists.of(1, 2, 3).stream().collect(Collectors.joining((e, i) => `T${i}T`))
      expect(arr.get(0)).to.be.equals(1)
      expect(arr.get(1)).to.be.equals("T0T")
      expect(arr.get(2)).to.be.equals(2)
      expect(arr.get(3)).to.be.equals("T1T")
      expect(arr.get(4)).to.be.equals(3)
      expect(arr.size()).to.be.equals(5)
    })
  })
})
