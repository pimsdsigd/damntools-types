import {assert, expect} from "chai"
import {InvalidArrayError, List} from "../../src"
import {IndexOutOfBoundError, InvalidIndexError} from "../../src/exceptions"

describe("List", () => {
  describe("List.constructor()", () => {
    it("with undefined array create new array", () => {
      expect(new List().collect().length).to.equals(0)
    })

    it("with invalid array throws", () => {
      assert.throw(() => new List(5), InvalidArrayError)
      assert.throw(() => new List(true), InvalidArrayError)
      assert.throw(() => new List({}), InvalidArrayError)
    })

    it("with empty array returns empty array", () => {
      expect(new List([]).collect().length).to.equals(0)
    })

    it("with array returns array", () => {
      const list = new List([65])
      expect(list.collect().length).to.equals(1)
      expect(list.get(0)).to.equals(65)
    })
  })

  describe("List.from", () => {
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

  describe("List.of", () => {
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

  describe("List.get", () => {
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

  describe("List.push", () => {
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

  describe("List.size", () => {
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
})
