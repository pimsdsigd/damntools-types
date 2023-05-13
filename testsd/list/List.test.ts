import {assert, expect} from "chai"
import {
  ArrayList,
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError,
  InvalidRangeEndError,
  InvalidRangeStartError
} from "../../src"

describe("List", () => {
  describe("constructor()", () => {
    it("with undefined array create new array", () => {
      expect(ArrayList.empty().getInner().length).to.equals(0)
    })

    it("with empty array returns empty array", () => {
      expect(ArrayList.from([]).getInner().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = ArrayList.from([65])
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
      // const a = new Array(6)
      // a.toList()
    })
  })

  describe("from", () => {
    it("with undefined array throws", () => {
      assert.throw(() => ArrayList.from(undefined), InvalidArrayError)
    })

    it("with empty array returns empty array", () => {
      expect(ArrayList.from([]).getInner().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = ArrayList.from([65])
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })
  })

  describe("of", () => {
    it("with 0 item returns empty", () => {
      expect(ArrayList.of().getInner().length).to.equals(0)
    })

    it("with 1 item returns correct array", () => {
      const list = ArrayList.of(65)
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })

    it("with N>1 item returns correct array", () => {
      const list = ArrayList.of(65, 66)
      expect(list.getInner().length).to.equals(2)
      expect(list.get(0)).to.equals(65)
      expect(list.get(1)).to.equals(66)
    })

    it("with one item array returns correct array of array", () => {
      const list = ArrayList.of([65])
      expect(list.getInner().length).to.equals(1)
      expect(list.get(0).length).to.equals(1)
      expect(list.get(0)[0]).to.equals(65)
    })
  })

  describe("filterPresent", () => {
    it("removes undefined and keeps present value", () => {
      let stringList = ArrayList.of("sdfl", undefined)
      expect(stringList.size()).to.equals(2)
      stringList = stringList.stream().filterPresent().collect()
      expect(stringList.size()).to.equals(1)
    })
  })

  describe("flat", () => {
    it("removes undefined and keeps present value", () => {
      const array = [1, 2, 3]
      const list = ArrayList.from(array)
        .stream()
        .map(item => ArrayList.range(0, item))
        .flat()
        .collect()
      expect(list.size()).to.equals(6)
      expect(list.get(0)).to.equals(0)
      expect(list.get(1)).to.equals(0)
      expect(list.get(2)).to.equals(1)
      expect(list.get(3)).to.equals(0)
      expect(list.get(4)).to.equals(1)
      expect(list.get(5)).to.equals(2)
    })
  })

  describe("flatMap", () => {
    it("returns correct if passed list", () => {
      const array = [1, 2, 3]
      const list = ArrayList.from(array)
        .stream()
        .flatMap(item => ArrayList.range(0, item))
        .collect()
      expect(list.size()).to.equals(6)
      expect(list.get(0)).to.equals(0)
      expect(list.get(1)).to.equals(0)
      expect(list.get(2)).to.equals(1)
      expect(list.get(3)).to.equals(0)
      expect(list.get(4)).to.equals(1)
      expect(list.get(5)).to.equals(2)
    })
    it("returns correct if passed array", () => {
      const array = [1, 2, 3]
      const list = ArrayList.from(array)
        .stream()
        .flatMap(item => ArrayList.range(0, item).getInner())
        .collect()
      expect(list.size()).to.equals(6)
      expect(list.get(0)).to.equals(0)
      expect(list.get(1)).to.equals(0)
      expect(list.get(2)).to.equals(1)
      expect(list.get(3)).to.equals(0)
      expect(list.get(4)).to.equals(1)
      expect(list.get(5)).to.equals(2)
    })
  })

  describe("get", () => {
    it("with undefined index throws", () => {
      assert.throw(() => ArrayList.of().get(undefined), InvalidIndexError)
    })

    it("with index equals to 0 returns first item", () => {
      const list = ArrayList.of(65, 66)
      expect(list.get(0)).to.equals(65)
    })

    it("with index in bound returns item", () => {
      const list = ArrayList.of(65, 66)
      expect(list.get(1)).to.equals(66)
    })

    it("with index inferior to 0 throws", () => {
      assert.throw(() => ArrayList.of().get(-1), IndexOutOfBoundError)
    })

    it("with index superior to length throws", () => {
      assert.throw(() => ArrayList.of().get(1), IndexOutOfBoundError)
    })

    it("with index equals to length throws", () => {
      assert.throw(() => ArrayList.of().get(0), IndexOutOfBoundError)
    })
  })

  describe("push", () => {
    it("with no items adds nothing", () => {
      const list = ArrayList.of().push()
      expect(list.size()).to.equals(0)
    })

    it("with 1 items adds 1 item", () => {
      const list = ArrayList.of().push(23)
      expect(list.size()).to.equals(1)
      expect(list.get(0)).to.equals(23)
    })

    it("with 2 items adds 2 item", () => {
      const list = ArrayList.of().push(23, 656)
      expect(list.size()).to.equals(2)
      expect(list.get(0)).to.equals(23)
      expect(list.get(1)).to.equals(656)
    })

    it("with 2 items and 1 already present adds 2 item", () => {
      const list = ArrayList.of(3).push(23, 656)
      expect(list.size()).to.equals(3)
      expect(list.get(0)).to.equals(3)
      expect(list.get(1)).to.equals(23)
      expect(list.get(2)).to.equals(656)
    })
  })

  describe("size", () => {
    it("for empty list returns 0", () => {
      expect(ArrayList.of().size()).to.equals(0)
    })

    it("for 1 item list returns 1", () => {
      expect(ArrayList.of(51).size()).to.equals(1)
    })

    it("for N item list returns N", () => {
      const length = 10000
      const list = ArrayList.of()
      for (let i = 0; i < length; i++) list.push(i)
      expect(list.size()).to.equals(length)
    })
  })

  describe("range", () => {
    it("with undefined as start throws", () => {
      assert.throw(
        () => ArrayList.range(undefined, undefined),
        InvalidRangeStartError
      )
    })

    it("with 0 as start does not throw", () => {
      assert.doesNotThrow(() => ArrayList.range(0, 10))
    })

    it("with undefined as end throws", () => {
      assert.throw(() => ArrayList.range(0, undefined), InvalidRangeEndError)
    })

    it("with end inferior to start throws", () => {
      assert.throw(() => ArrayList.range(1, 0), InvalidRangeEndError)
    })

    it("with start as end does not throw", () => {
      assert.doesNotThrow(() => ArrayList.range(0, 0))
    })

    it("with 0 as end does not throw", () => {
      assert.doesNotThrow(() => ArrayList.range(-1, 0))
    })

    it("0 length returns correct array length", () => {
      const length = 0
      const range = ArrayList.range(0, length)
      expect(range.getInner().length).to.equals(length)
    })

    it("N length returns correct array length", () => {
      const length = 2
      const range = ArrayList.range(0, length)
      expect(range.getInner().length).to.equals(length)
    })
  })
})
