import {Lists} from "./Lists"
import {
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../../exceptions"

describe("Lists", () => {
  describe("range", () => {
    it("with undefined as start throws", () => {
      expect(() => Lists.range(undefined, undefined)).toThrow(InvalidRangeStartError)
    })

    it("with 0 as start does not throw", () => {
      expect(() => Lists.range(0, 10)).not.toThrow()
    })

    it("with undefined as end throws", () => {
      expect(() => Lists.range(0, undefined)).toThrow(InvalidRangeEndError)
    })

    it("with end inferior to start throws", () => {
      expect(() => Lists.range(1, 0)).toThrow(InvalidRangeEndError)
    })

    it("with start as end does not throw", () => {
      expect(() => Lists.range(0, 0)).not.toThrow()
    })

    it("with 0 as end does not throw", () => {
      expect(() => Lists.range(-1, 0)).not.toThrow()
    })

    it("0 length returns correct array length", () => {
      const length = 0
      const range = Lists.range(0, length)
      expect(range.getInner().length).toBe(length)
    })

    it("N length returns correct array length", () => {
      const length = 2
      const range = Lists.range(0, length)
      expect(range.getInner().length).toBe(length)
    })
  })

  describe("from", () => {
    it("with undefined array throws", () => {
      expect(() => Lists.from(null)).toThrow(InvalidArrayError)
    })

    it("with empty array returns empty array", () => {
      expect(Lists.from([]).getInner().length).toBe(0)
    })

    it("with array returns array", () => {
      const list = Lists.from([65])
      expect(list.getInner().length).toBe(1)
      expect(list.get(0)).toBe(65)
    })
  })

  describe("of", () => {
    it("with 0 item returns empty", () => {
      expect(Lists.of().getInner().length).toBe(0)
    })

    it("with 1 item returns correct array", () => {
      const list = Lists.of(65)
      expect(list.getInner().length).toBe(1)
      expect(list.get(0)).toBe(65)
    })

    it("with N>1 item returns correct array", () => {
      const list = Lists.of(65, 66)
      expect(list.getInner().length).toBe(2)
      expect(list.get(0)).toBe(65)
      expect(list.get(1)).toBe(66)
    })

    it("with one item array returns correct array of array", () => {
      const list = Lists.of([65])
      expect(list.getInner().length).toBe(1)
      expect(list.get(0).length).toBe(1)
      expect(list.get(0)[0]).toBe(65)
    })
  })

  describe("sub", () => {
    it("with 0 item returns empty", () => {
      expect(Lists.sub(Lists.empty(), 0).size()).toBe(0)
    })

    it("with 1 item and 0 1 returns same", () => {
      expect(Lists.sub(Lists.of("1"), 0).size()).toBe(1)
    })
    it("with 1 item and 0 und returns same", () => {
      expect(Lists.sub(Lists.of("1"), 0, 1).size()).toBe(1)
    })
    it("with 1 item and 1 0 returns empty", () => {
      expect(Lists.sub(Lists.of("1"), 1, 0).size()).toBe(0)
    })
    it("with 1 item and 1 1 returns empty", () => {
      expect(Lists.sub(Lists.of("1"), 1, 1).size()).toBe(0)
    })

    it("with multi item and 0 1 returns 1", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 0, 1).size()).toBe(1)
    })
    it("with multi item and 0 und returns same", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 0, undefined).size()).toBe(3)
    })
    it("with multi item and 1 0 returns empty", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 0).size()).toBe(0)
    })
    it("with multi item and 1 1 returns empty", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 1).size()).toBe(0)
    })
    it("with multi item and 1 3 returns 2", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 3).size()).toBe(2)
    })
  })

  describe("lengthSub", () => {
    it("with 0 item 0 0 returns empty", () => {
      expect(Lists.lengthSub(Lists.empty(), 0, 0).size()).toBe(0)
    })
    it("with 0 item 0 1 returns empty", () => {
      expect(Lists.lengthSub(Lists.empty(), 0, 1).size()).toBe(0)
    })
    it("with 0 item 1 0 returns empty", () => {
      expect(Lists.lengthSub(Lists.empty(), 1, 0).size()).toBe(0)
    })

    it("with 1 item and 0 1 returns same", () => {
      expect(Lists.lengthSub(Lists.of("1"), 0, 1).size()).toBe(1)
    })
    it("with 1 item and 1 0 returns empty", () => {
      expect(Lists.lengthSub(Lists.of("1"), 1, 0).size()).toBe(0)
    })
    it("with 1 item and 1 1 returns empty", () => {
      expect(Lists.lengthSub(Lists.of("1"), 1, 1).size()).toBe(0)
    })

    it("with multi item and 0 1 returns 1", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 0, 1)
      expect(res.size()).toBe(1)
    })
    it("with multi item and 1 0 returns empty", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 1, 0)
      expect(res.size()).toBe(0)
    })
    it("with multi item and 1 1 returns 1", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 1, 1)
      expect(res.size()).toBe(1)
    })
    it("with multi item and 1 2 returns 2", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 1, 2)
      expect(res.size()).toBe(2)
    })
    it("with multi item and 1 3 returns 2 (overflow)", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 1, 3)
      expect(res.size()).toBe(2)
    })
    it("with multi item and 0 3 returns 3 (full)", () => {
      const res = Lists.lengthSub(Lists.of("1", "2", "3"), 0, 3)
      expect(res.size()).toBe(3)
    })
  })
})
