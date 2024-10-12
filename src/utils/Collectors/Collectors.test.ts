import {Lists} from "../Lists"
import {Collectors} from "./Collectors"

describe("Collectors", () => {
  describe("joining", () => {
    it("correctly join non unique list", () => {
      const arr = Lists.of(1, 2, 3).stream().collect(Collectors.joining("TT"))
      expect(arr.get(0)).toBe(1)
      expect(arr.get(1)).toBe("TT")
      expect(arr.get(2)).toBe(2)
      expect(arr.get(3)).toBe("TT")
      expect(arr.get(4)).toBe(3)
      expect(arr.size()).toBe(5)
    })
    it("corectly joins unique list", () => {
      const arr = Lists.of(1).stream().collect(Collectors.joining("TT"))
      expect(arr.get(0)).toBe(1)
      expect(arr.size()).toBe(1)
    })
    it("correctly join non unique list with function sep", () => {
      const arr = Lists.of(1, 2, 3)
        .stream()
        .collect(Collectors.joining((e, i) => `T${i}T`))
      expect(arr.get(0)).toBe(1)
      expect(arr.get(1)).toBe("T0T")
      expect(arr.get(2)).toBe(2)
      expect(arr.get(3)).toBe("T1T")
      expect(arr.get(4)).toBe(3)
      expect(arr.size()).toBe(5)
    })
  })
})
