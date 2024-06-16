import {assert, expect} from "chai"
import {Lists} from "./Lists"
import {
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../../exceptions"

describe("Lists", () => {
  describe("range", () => {
    it("with undefined as start throws", () => {
      assert.throw(() => Lists.range(undefined, undefined), InvalidRangeStartError)
    })

    it("with 0 as start does not throw", () => {
      assert.doesNotThrow(() => Lists.range(0, 10))
    })

    it("with undefined as end throws", () => {
      assert.throw(() => Lists.range(0, undefined), InvalidRangeEndError)
    })

    it("with end inferior to start throws", () => {
      assert.throw(() => Lists.range(1, 0), InvalidRangeEndError)
    })

    it("with start as end does not throw", () => {
      assert.doesNotThrow(() => Lists.range(0, 0))
    })

    it("with 0 as end does not throw", () => {
      assert.doesNotThrow(() => Lists.range(-1, 0))
    })

    it("0 length returns correct array length", () => {
      const length = 0
      const range = Lists.range(0, length)
      expect(range.getInner().length).to.equals(length)
    })

    it("N length returns correct array length", () => {
      const length = 2
      const range = Lists.range(0, length)
      expect(range.getInner().length).to.equals(length)
    })
  })

  describe("from", () => {
    it("with undefined array throws", () => {
      assert.throw(() => Lists.from(null), InvalidArrayError)
    })

    it("with empty array returns empty array", () => {
      expect(Lists.from([]).getInner().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = Lists.from([65])
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })
  })

  describe("of", () => {
    it("with 0 item returns empty", () => {
      expect(Lists.of().getInner().length).to.equals(0)
    })

    it("with 1 item returns correct array", () => {
      const list = Lists.of(65)
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })

    it("with N>1 item returns correct array", () => {
      const list = Lists.of(65, 66)
      expect(list.getInner().length).to.equals(2)
      expect(list.get(0)).to.equals(65)
      expect(list.get(1)).to.equals(66)
    })

    it("with one item array returns correct array of array", () => {
      const list = Lists.of([65])
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0).length).to.equals(1)
      expect(list.get(0)[0]).to.equals(65)
    })
  })

  describe("sub", () => {
    it("with 0 item returns empty", () => {
      expect(Lists.sub(Lists.empty(), 0).size()).to.equals(0)
    })

    it("with 1 item and 0 1 returns same", () => {
      expect(Lists.sub(Lists.of("1"), 0).size()).to.equals(1)
    })
    it("with 1 item and 0 und returns same", () => {
      expect(Lists.sub(Lists.of("1"), 0, 1).size()).to.equals(1)
    })
    it("with 1 item and 1 0 returns empty", () => {
      expect(Lists.sub(Lists.of("1"), 1, 0).size()).to.equals(0)
    })
    it("with 1 item and 1 1 returns empty", () => {
      expect(Lists.sub(Lists.of("1"), 1, 1).size()).to.equals(0)
    })

    it("with multi item and 0 1 returns 1", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 0, 1).size()).to.equals(1)
    })
    it("with multi item and 0 und returns same", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 0, undefined).size()).to.equals(3)
    })
    it("with multi item and 1 0 returns empty", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 0).size()).to.equals(0)
    })
    it("with multi item and 1 1 returns empty", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 1).size()).to.equals(0)
    })
    it("with multi item and 1 3 returns 2", () => {
      expect(Lists.sub(Lists.of("1", "2", "3"), 1, 3).size()).to.equals(2)
    })

  })
})
