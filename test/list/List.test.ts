import {assert, expect} from "chai"
import {
  InvalidArrayError,
  InvalidRangeEndError,
  InvalidRangeStartError,
  List
} from "../../src"
import {IndexOutOfBoundError, InvalidIndexError} from "../../src/exceptions"

describe("List", () => {
  describe("constructor()", () => {
    it("with undefined array create new array", () => {
      expect(List.empty().collect().length).to.equals(0)
    })

    it("with empty array returns empty array", () => {
      expect(List.from([]).collect().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = List.from([65])
      expect(list.collect().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
      // const a = new Array(6)
      // a.toList()
    })
  })

  describe("from", () => {
    it("with undefined array throws", () => {
      assert.throw(() => List.from(undefined), InvalidArrayError)
    })

    it("with empty array returns empty array", () => {
      expect(List.from([]).collect().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = List.from([65])
      expect(list.collect().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })
  })

  describe("of", () => {
    it("with 0 item returns empty", () => {
      expect(List.of().collect().length).to.equals(0)
    })

    it("with 1 item returns correct array", () => {
      const list = List.of(65)
      expect(list.collect().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })

    it("with N>1 item returns correct array", () => {
      const list = List.of(65, 66)
      expect(list.collect().length).to.equals(2)
      expect(list.get(0)).to.equals(65)
      expect(list.get(1)).to.equals(66)
    })

    it("with one item array returns correct array of array", () => {
      const list = List.of([65])
      expect(list.collect().length).to.equals(1)
      expect(list.get(0).length).to.equals(1)
      expect(list.get(0)[0]).to.equals(65)
    })
  })

  describe("filterPresent", () => {
    it("removes undefined and keeps present value", () => {
      let stringList = List.of("sdfl", undefined)
      expect(stringList.size()).to.equals(2)
      stringList = stringList.filterPresent()
      expect(stringList.size()).to.equals(1)
    })
  })

  describe("flat", () => {
    it("removes undefined and keeps present value", () => {
      const array = [1, 2, 3]
      const list = List.from(array)
        .map(item => List.range(0, item))
        .flat()
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
      const list = List.from(array).flatMap(item => List.range(0, item))
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
      const list = List.from(array).flatMap(item =>
        List.range(0, item).collect()
      )
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
      assert.throw(() => List.of().get(undefined), InvalidIndexError)
    })

    it("with index equals to 0 returns first item", () => {
      const list = List.of(65, 66)
      expect(list.get(0)).to.equals(65)
    })

    it("with index in bound returns item", () => {
      const list = List.of(65, 66)
      expect(list.get(1)).to.equals(66)
    })

    it("with index inferior to 0 throws", () => {
      assert.throw(() => List.of().get(-1), IndexOutOfBoundError)
    })

    it("with index superior to length throws", () => {
      assert.throw(() => List.of().get(1), IndexOutOfBoundError)
    })

    it("with index equals to length throws", () => {
      assert.throw(() => List.of().get(0), IndexOutOfBoundError)
    })
  })

  describe("push", () => {
    it("with no items adds nothing", () => {
      const list = List.of().push()
      expect(list.size()).to.equals(0)
    })

    it("with 1 items adds 1 item", () => {
      const list = List.of().push(23)
      expect(list.size()).to.equals(1)
      expect(list.get(0)).to.equals(23)
    })

    it("with 2 items adds 2 item", () => {
      const list = List.of().push(23, 656)
      expect(list.size()).to.equals(2)
      expect(list.get(0)).to.equals(23)
      expect(list.get(1)).to.equals(656)
    })

    it("with 2 items and 1 already present adds 2 item", () => {
      const list = List.of(3).push(23, 656)
      expect(list.size()).to.equals(3)
      expect(list.get(0)).to.equals(3)
      expect(list.get(1)).to.equals(23)
      expect(list.get(2)).to.equals(656)
    })
  })

  describe("size", () => {
    it("for empty list returns 0", () => {
      expect(List.of().size()).to.equals(0)
    })

    it("for 1 item list returns 1", () => {
      expect(List.of(51).size()).to.equals(1)
    })

    it("for N item list returns N", () => {
      const length = 10000
      const list = List.of()
      for (let i = 0; i < length; i++) list.push(i)
      expect(list.size()).to.equals(length)
    })
  })

  describe("range", () => {
    it("with undefined as start throws", () => {
      assert.throw(
        () => List.range(undefined, undefined),
        InvalidRangeStartError
      )
    })

    it("with 0 as start does not throw", () => {
      assert.doesNotThrow(() => List.range(0, 10))
    })

    it("with undefined as end throws", () => {
      assert.throw(() => List.range(0, undefined), InvalidRangeEndError)
    })

    it("with end inferior to start throws", () => {
      assert.throw(() => List.range(1, 0), InvalidRangeEndError)
    })

    it("with start as end does not throw", () => {
      assert.doesNotThrow(() => List.range(0, 0))
    })

    it("with 0 as end does not throw", () => {
      assert.doesNotThrow(() => List.range(-1, 0))
    })

    it("0 length returns correct array length", () => {
      const length = 0
      const range = List.range(0, length)
      expect(range.collect().length).to.equals(length)
    })

    it("N length returns correct array length", () => {
      const length = 2
      const range = List.range(0, length)
      expect(range.collect().length).to.equals(length)
    })
  })
})
