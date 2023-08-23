import {expect} from "chai"
import {ArrayList} from "./ArrayList"
import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError
} from "../../exceptions"
import {compareNumbers, compareStrings} from "../../core"

// @ts-ignore
const newArray = <T>(array?: any) => new ArrayList<T>(array)

describe("ArrayList", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      expect(newArray().size()).to.be.equals(0)
    })
    it("not an array throws", () => {
      expect(() => newArray(1)).to.throw(InvalidArrayError)
      expect(() => newArray(true)).to.throw(InvalidArrayError)
      expect(() => newArray({})).to.throw(InvalidArrayError)
      expect( newArray("").size()).to.be.eq(0)
    })
    it("array provided", () => {
      expect(newArray([1]).size()).to.be.equals(1)
    })
  })

  describe("copy()", () => {
    it("does not mutate old", () => {
      const arr1 = new ArrayList([5, 10])
      const arr2 = arr1.copy()
      expect(arr1.size()).to.be.equals(2)
      expect(arr2.size()).to.be.equals(2)
      arr1.push(15)
      expect(arr1.size()).to.be.equals(3)
      expect(arr2.size()).to.be.equals(2)
      arr2.push(20, 25)
      expect(arr1.size()).to.be.equals(3)
      expect(arr2.size()).to.be.equals(4)
    })
  })

  describe("getInner()", () => {
    it("does not mutate old", () => {
      const arr1 = new ArrayList([5, 10])
      const arr2 = arr1.getInner()
      expect(arr1.size()).to.be.equals(2)
      expect(arr2.length).to.be.equals(2)
      arr1.push(15)
      expect(arr1.size()).to.be.equals(3)
      expect(arr2.length).to.be.equals(2)
      arr2.push(20, 25)
      expect(arr1.size()).to.be.equals(3)
      expect(arr2.length).to.be.equals(4)
    })
  })

  describe("forEach()", () => {
    it("traverses each item", () => {
      const arr1 = new ArrayList([5, 10])
      let cpt = 0
      arr1.forEach(i => i && cpt++)
      expect(cpt).to.be.equals(2)
    })
  })

  describe("hasElements()", () => {
    it("empty returns false", () => {
      const arr1 = new ArrayList()
      expect(arr1.hasElements()).to.be.false
    })
    it("not empty returns true", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.hasElements()).to.be.true
    })
  })

  describe("isEmpty()", () => {
    it("empty returns true", () => {
      const arr1 = new ArrayList()
      expect(arr1.isEmpty()).to.be.true
    })
    it("not empty returns false", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.isEmpty()).to.be.false
    })
  })

  describe("get()", () => {
    it("on empty return undefined", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.get(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.get(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.get(1)).to.throw(IndexOutOfBoundError)
    })
    it("index undefined throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.get(undefined)).to.throw(InvalidIndexError)
    })
    it("index -1 gets last", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(-1)).to.be.equals(10)
    })
    it("index -n gets last-n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(-2)).to.be.equals(5)
    })
    it("index 0 gets first", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(0)).to.be.equals(5)
    })
    it("index n gets n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(1)).to.be.equals(10)
    })
    it("index n >= length throws", () => {
      const arr1 = new ArrayList([5, 10])
      expect(() => arr1.get(2)).to.throw(IndexOutOfBoundError)
    })
  })

  describe("getOptional()", () => {
    it("on empty return empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.getOptional(-1).isEmpty()).to.be.true
      expect(arr1.getOptional(0).isEmpty()).to.be.true
      expect(arr1.getOptional(1).isEmpty()).to.be.true
    })
    it("index undefined throws", () => {
      const arr1 = new ArrayList()
      expect(arr1.getOptional(undefined).isEmpty()).to.be.true
    })
    it("index -1 getOptionals last", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(-1).isPresent()).to.be.true
      expect(arr1.getOptional(-1).get()).to.be.equals(10)
    })
    it("index -n getOptionals last-n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(-2).isPresent()).to.be.true
      expect(arr1.getOptional(-2).get()).to.be.equals(5)
    })
    it("index 0 getOptionals first", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(0).isPresent()).to.be.true
      expect(arr1.getOptional(0).get()).to.be.equals(5)
    })
    it("index n getOptionals n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(1).isPresent()).to.be.true
      expect(arr1.getOptional(1).get()).to.be.equals(10)
    })
    it("index n >= length throws", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(2).isEmpty()).to.be.true
    })
  })

  describe("indexOf()", () => {
    it("on empty returns -1", () => {
      const arr1 = new ArrayList()
      expect(arr1.indexOf("T").isEmpty()).to.be.true
    })
    it("on not found returns -1", () => {
      const arr1 = new ArrayList(["A"])
      expect(arr1.indexOf("T").isEmpty()).to.be.true
    })
    it("on found returns index", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.indexOf("T").isPresent()).to.be.true
      expect(arr1.indexOf("T").get()).to.be.equals(1)
    })
  })

  describe("first()", () => {
    it("on empty returns empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.first().isEmpty()).to.be.true
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.first().isPresent()).to.be.true
      expect(arr1.first().get()).to.be.equals("A")
    })
  })

  describe("last()", () => {
    it("on empty returns empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.last().isEmpty()).to.be.true
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.last().isPresent()).to.be.true
      expect(arr1.last().get()).to.be.equals("B")
    })
    it("on one item returns correct", () => {
      const arr1 = new ArrayList(["A"])
      expect(arr1.last().isPresent()).to.be.true
      expect(arr1.last().get()).to.be.equals("A")
    })
  })

  describe("clear()", () => {
    it("on empty clears", () => {
      const arr1 = new ArrayList()
      expect(arr1.clear().size()).to.be.equals(0)
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.size()).to.be.equals(3)
      expect(arr1.clear().size()).to.be.equals(0)
    })
  })

  describe("remove()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.remove(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.remove(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.remove(1)).to.throw(IndexOutOfBoundError)
    })
    it("index -1 removes last", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(-1)
      expect(arr1.size()).to.be.equals(1)
      expect(arr1.get(0)).to.be.equals(5)
    })
    it("index -n removes last-n", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(-2)
      expect(arr1.size()).to.be.equals(1)
      expect(arr1.get(0)).to.be.equals(10)
    })
    it("index 0 removes first", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(0)
      expect(arr1.size()).to.be.equals(1)
      expect(arr1.get(0)).to.be.equals(10)
    })
    it("index n removes n", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(1)
      expect(arr1.size()).to.be.equals(1)
      expect(arr1.get(0)).to.be.equals(5)
    })
    it("index n >= length o nothing", () => {
      const arr1 = new ArrayList([5, 10])
      expect(() => arr1.remove(2)).to.throw(IndexOutOfBoundError)
    })
  })

  describe("delete()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.delete(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.delete(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.delete(1)).to.throw(IndexOutOfBoundError)
    })
    it("start -1 deletes last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(-1)
      expect(arr1.size()).to.be.equals(4)
      expect(arr1.get(0)).to.be.equals(5)
      expect(arr1.get(1)).to.be.equals(10)
    })
    it("start -n deletes length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(-2)
      expect(arr1.size()).to.be.equals(3)
      expect(arr1.get(0)).to.be.equals(5)
    })
    it("start 0 deletes first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(0)
      expect(arr1.size()).to.be.equals(0)
    })
    it("start n deletes n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(1)
      expect(arr1.size()).to.be.equals(1)
      expect(arr1.get(0)).to.be.equals(5)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.delete(5)).to.throw(IndexOutOfBoundError)
    })
    it("end before start throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.delete(2, 1)).to.throw(InvalidIndexError)
    })
    it("end after start correctly deletes", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(0, 2)
      expect(arr1.size()).to.be.equals(3)
      expect(arr1.get(0)).to.be.equals(15)
    })
    it("end after start 2 correctly deletes", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(1, 2)
      expect(arr1.size()).to.be.equals(4)
      expect(arr1.get(0)).to.be.equals(5)
      expect(arr1.get(1)).to.be.equals(15)
    })
  })

  describe("sub()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.sub(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.sub(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.sub(1)).to.throw(IndexOutOfBoundError)
    })
    it("start -1 subs last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(-1)
      expect(arr2.size()).to.be.equals(1)
      expect(arr2.get(0)).to.be.equals(25)
    })
    it("start -n subs length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(-2)
      expect(arr2.size()).to.be.equals(2)
      expect(arr2.get(0)).to.be.equals(20)
      expect(arr2.get(1)).to.be.equals(25)
    })
    it("start 0 subs first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(0)
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(0)).to.be.equals(5)
    })
    it("start n subs n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(1)
      expect(arr2.size()).to.be.equals(4)
      expect(arr2.get(0)).to.be.equals(10)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.sub(5)).to.throw(IndexOutOfBoundError)
    })
    it("end before start throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.sub(2, 1)).to.throw(InvalidIndexError)
    })
    it("end after start correctly subs", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(0, 2)
      expect(arr2.size()).to.be.equals(2)
      expect(arr2.get(0)).to.be.equals(5)
      expect(arr2.get(1)).to.be.equals(10)
    })
    it("end after start 2 correctly subs", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(1, 2)
      expect(arr2.size()).to.be.equals(1)
      expect(arr2.get(0)).to.be.equals(10)
    })
  })

  describe("insert()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.insert(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.insert(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.insert(1)).to.throw(IndexOutOfBoundError)
    })
    it("start -1 inserts last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(-1, [100])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(4)).to.be.equals(100)
      expect(arr2.get(5)).to.be.equals(25)
    })
    it("start -n inserts length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(-2, [100])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(3)).to.be.equals(100)
      expect(arr2.get(4)).to.be.equals(20)
    })
    it("start 0 inserts first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(0, [100])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(0)).to.be.equals(100)
      expect(arr2.get(1)).to.be.equals(5)
    })
    it("start n inserts n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(1, [100])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(0)).to.be.equals(5)
      expect(arr2.get(1)).to.be.equals(100)
      expect(arr2.get(2)).to.be.equals(10)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.insert(5)).to.throw(IndexOutOfBoundError)
    })
  })

  describe("replace()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.replace(undefined)).to.throw(InvalidIndexError)
      expect(() => arr1.replace(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.replace(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.replace(1)).to.throw(IndexOutOfBoundError)
    })
    it("start -1 replaces last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(-1, [100])
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(4)).to.be.equals(100)
    })
    it("start -n replaces length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(-2, [100])
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(3)).to.be.equals(100)
      expect(arr2.get(4)).to.be.equals(25)
    })
    it("start 0 replaces first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(0, [100, 101])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(0)).to.be.equals(100)
      expect(arr2.get(1)).to.be.equals(101)
      expect(arr2.get(2)).to.be.equals(10)
    })
    it("start n replaces n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(1, new ArrayList([100]))
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(0)).to.be.equals(5)
      expect(arr2.get(1)).to.be.equals(100)
      expect(arr2.get(2)).to.be.equals(15)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.replace(5)).to.throw(IndexOutOfBoundError)
    })
  })

  describe("replaceFrom()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.replaceFrom(undefined)).to.throw(InvalidIndexError)
      expect(() => arr1.replaceFrom(-1)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.replaceFrom(0)).to.throw(IndexOutOfBoundError)
      expect(() => arr1.replaceFrom(1)).to.throw(IndexOutOfBoundError)
    })
    it("start -1 replaceFroms last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(-1, [100, 101])
      expect(arr2.size()).to.be.equals(6)
      expect(arr2.get(4)).to.be.equals(100)
      expect(arr2.get(5)).to.be.equals(101)
    })
    it("start -n replaceFroms length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(-2, [100, 101])
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(3)).to.be.equals(100)
      expect(arr2.get(4)).to.be.equals(101)
    })
    it("start 0 replaceFroms first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(0, [100, 101])
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(0)).to.be.equals(100)
      expect(arr2.get(1)).to.be.equals(101)
      expect(arr2.get(2)).to.be.equals(15)
    })
    it("start n replaceFroms n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(1, new ArrayList([100, 101]))
      expect(arr2.size()).to.be.equals(5)
      expect(arr2.get(0)).to.be.equals(5)
      expect(arr2.get(1)).to.be.equals(100)
      expect(arr2.get(2)).to.be.equals(101)
      expect(arr2.get(3)).to.be.equals(20)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.replaceFrom(5)).to.throw(IndexOutOfBoundError)
    })
  })

  describe("concat()", () => {
    it("on empty adds elements", () => {
      const arr1 = new ArrayList()
      arr1.concat([1], new ArrayList([2]))
      expect(arr1.getInner()).to.eql([1, 2])
    })

    it("with undefined do nothing", () => {
      const arr1 = new ArrayList([5])
      arr1.concat(undefined)
      expect(arr1.getInner()).to.eql([5])
    })

    it("on not empty adds elements", () => {
      const arr1 = new ArrayList([5])
      arr1.concat([1], new ArrayList([2]))
      expect(arr1.getInner()).to.eql([5, 1, 2])
    })
  })

  describe("sort()", () => {
    it("on empty do nothing", () => {
      const arr1 = new ArrayList()
      arr1.sort(compareNumbers)
      expect(arr1.size()).to.eql(0)
    })
    it("correctly sorts numbers", () => {
      const arr1 = new ArrayList([10, 6, 33, 85, 6, 5, 6])
      arr1.sort(compareNumbers)
      expect(arr1.getInner()).to.eql([5, 6, 6, 6, 10, 33, 85])
    })
    it("correctly sorts strings", () => {
      const arr1 = new ArrayList(["10", "6", "33", "85", "6", "5", "6"])
      arr1.sort(compareStrings)
      expect(arr1.getInner()).to.eql(["10", "33", "5", "6", "6", "6", "85"])
    })
    it("correctly sorts objects", () => {
      const gen = (i: number) => ({val: i})
      const arr1 = new ArrayList<{val: number}>([
        gen(10),
        gen(6),
        gen(33),
        gen(85),
        gen(6),
        gen(5),
        gen(6)
      ])
      arr1.sort((a, b) => compareNumbers(a.val, b.val))
      expect(arr1.getInner()).to.eql([
        gen(5),
        gen(6),
        gen(6),
        gen(6),
        gen(10),
        gen(33),
        gen(85)
      ])
    })
  })

  describe("sortWith()", () => {
    it("correctly sorts objects", () => {
      const gen = (i: number) => ({val: i})
      const arr1 = new ArrayList<{val: number}>([
        gen(10),
        gen(6),
        gen(33),
        gen(85),
        gen(6),
        gen(5),
        gen(6)
      ])
      arr1.sortWith("val")
      expect(arr1.getInner()).to.eql([
        gen(5),
        gen(6),
        gen(6),
        gen(6),
        gen(10),
        gen(33),
        gen(85)
      ])
    })
  })
})
