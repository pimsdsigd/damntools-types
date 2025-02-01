import {Lists} from "../../utils";
import {ListStream} from "./ListStream";

describe("ListStream", () => {
  describe("groupByKey()", () => {
    it("correctly groups", () => {
      const list = Lists.of(
        {a: 5, b: 1},
        {a: 4, b: 2},
        {a: 5, b: 3},
        {a: null, b: 3},
      )
      const groupBy = list.stream().groupByKey("a")
      expect(groupBy.get("5").size()).toBe(2)
      expect(groupBy.get("4").size()).toBe(1)
      expect(groupBy.get("undefined").size()).toBe(1)
    })
  })
  describe("groupByFunction()", () => {
    it("correctly groups", () => {
      const list = Lists.of(
        {a: 5, b: 1},
        {a: 4, b: 2},
        {a: 5, b: 3},
        {a: null, b: 3},
      )
      const groupBy = list.stream().groupByFunction(i => i.a)
      console.log(groupBy)
      expect(groupBy.get(5).size()).toBe(2)
      expect(groupBy.get(4).size()).toBe(1)
      expect(groupBy.get(undefined).size()).toBe(1)
    })
  })

  describe("collectList()", () => {
    it("correctly collectList", () => {
      const list = new ListStream([15, 12]).collectList()
      expect(list.size()).toBe(2)
      expect(list.get(0)).toBe(15)
      expect(list.get(1)).toBe(12)
    })
  })
})
