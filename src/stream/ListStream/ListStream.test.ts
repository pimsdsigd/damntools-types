import {Lists} from "../../utils";

describe("ListStream", () => {
  describe("groupBy()", () => {
    it("correctly groups", () => {
      const list = Lists.of(
        {a: 5,b:1},
        {a: 4,b:2},
        {a: 5,b:3},
        {a: null,b:3},
      )
      const groupBy = list.stream().groupBy("a")
      expect(groupBy.get("5").size()).toBe(2)
      expect(groupBy.get("4").size()).toBe(1)
      expect(groupBy.get("undefined").size()).toBe(1)
    })
  })
})