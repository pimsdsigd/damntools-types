import {ArrayList} from "./ArrayList"
import {
  IndexOutOfBoundError,
  InvalidArrayError,
  InvalidIndexError
} from "../../exceptions"
import {compareNumbers, compareStrings} from "../../core"
import {Lists} from "../../utils"

const newArray = <T>(array?: any) => new ArrayList<T>(array)

describe("ArrayList", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      expect(newArray().size()).toBe(0)
    })
    it("not an array throws", () => {
      expect(() => newArray(1)).toThrow(InvalidArrayError)
      expect(() => newArray(true)).toThrow(InvalidArrayError)
      expect(() => newArray({})).toThrow(InvalidArrayError)
      expect(newArray("").size()).toBe(0)
    })
    it("array provided", () => {
      expect(newArray([1]).size()).toBe(1)
    })
  })

  describe("copy()", () => {
    it("does not mutate old", () => {
      const arr1 = new ArrayList([5, 10])
      const arr2 = arr1.copy()
      expect(arr1.size()).toBe(2)
      expect(arr2.size()).toBe(2)
      arr1.push(15)
      expect(arr1.size()).toBe(3)
      expect(arr2.size()).toBe(2)
      arr2.push(20, 25)
      expect(arr1.size()).toBe(3)
      expect(arr2.size()).toBe(4)
    })
  })

  describe("getInner()", () => {
    it("does not mutate old", () => {
      const arr1 = new ArrayList([5, 10])
      const arr2 = arr1.getInner()
      expect(arr1.size()).toBe(2)
      expect(arr2.length).toBe(2)
      arr1.push(15)
      expect(arr1.size()).toBe(3)
      expect(arr2.length).toBe(2)
      arr2.push(20, 25)
      expect(arr1.size()).toBe(3)
      expect(arr2.length).toBe(4)
    })
  })

  describe("forEach()", () => {
    it("traverses each item", () => {
      const arr1 = new ArrayList([5, 10])
      let cpt = 0
      arr1.forEach(i => i && cpt++)
      expect(cpt).toBe(2)
    })
  })

  describe("hasElements()", () => {
    it("empty returns false", () => {
      const arr1 = new ArrayList()
      expect(arr1.hasElements()).toBe(false)
    })
    it("not empty returns true", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.hasElements()).toBeTruthy()
    })
  })

  describe("isEmpty()", () => {
    it("empty returns true", () => {
      const arr1 = new ArrayList()
      expect(arr1.isEmpty()).toBeTruthy()
    })
    it("not empty returns false", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.isEmpty()).toBe(false)
    })
  })

  describe("get()", () => {
    it("on empty return undefined", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.get(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.get(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.get(1)).toThrow(IndexOutOfBoundError)
    })
    it("index undefined throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.get(undefined)).toThrow(InvalidIndexError)
    })
    it("index -1 gets last", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(-1)).toBe(10)
    })
    it("index -n gets last-n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(-2)).toBe(5)
    })
    it("index 0 gets first", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(0)).toBe(5)
    })
    it("index n gets n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.get(1)).toBe(10)
    })
    it("index n >= length throws", () => {
      const arr1 = new ArrayList([5, 10])
      expect(() => arr1.get(2)).toThrow(IndexOutOfBoundError)
    })
  })

  describe("getOptional()", () => {
    it("on empty return empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.getOptional(-1).isEmpty()).toBeTruthy()
      expect(arr1.getOptional(0).isEmpty()).toBeTruthy()
      expect(arr1.getOptional(1).isEmpty()).toBeTruthy()
    })
    it("index undefined throws", () => {
      const arr1 = new ArrayList()
      expect(arr1.getOptional(undefined).isEmpty()).toBeTruthy()
    })
    it("index -1 getOptionals last", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(-1).isPresent()).toBeTruthy()
      expect(arr1.getOptional(-1).get()).toBe(10)
    })
    it("index -n getOptionals last-n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(-2).isPresent()).toBeTruthy()
      expect(arr1.getOptional(-2).get()).toBe(5)
    })
    it("index 0 getOptionals first", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(0).isPresent()).toBeTruthy()
      expect(arr1.getOptional(0).get()).toBe(5)
    })
    it("index n getOptionals n", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(1).isPresent()).toBeTruthy()
      expect(arr1.getOptional(1).get()).toBe(10)
    })
    it("index n >= length throws", () => {
      const arr1 = new ArrayList([5, 10])
      expect(arr1.getOptional(2).isEmpty()).toBeTruthy()
    })
  })

  describe("indexOf()", () => {
    it("on empty returns -1", () => {
      const arr1 = new ArrayList()
      expect(arr1.indexOf("T").isEmpty()).toBeTruthy()
    })
    it("on not found returns -1", () => {
      const arr1 = new ArrayList(["A"])
      expect(arr1.indexOf("T").isEmpty()).toBeTruthy()
    })
    it("on found returns index", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.indexOf("T").isPresent()).toBeTruthy()
      expect(arr1.indexOf("T").get()).toBe(1)
    })
  })

  describe("first()", () => {
    it("on empty returns empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.first().isEmpty()).toBeTruthy()
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.first().isPresent()).toBeTruthy()
      expect(arr1.first().get()).toBe("A")
    })
  })

  describe("last()", () => {
    it("on empty returns empty", () => {
      const arr1 = new ArrayList()
      expect(arr1.last().isEmpty()).toBeTruthy()
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.last().isPresent()).toBeTruthy()
      expect(arr1.last().get()).toBe("B")
    })
    it("on one item returns correct", () => {
      const arr1 = new ArrayList(["A"])
      expect(arr1.last().isPresent()).toBeTruthy()
      expect(arr1.last().get()).toBe("A")
    })
  })

  describe("clear()", () => {
    it("on empty clears", () => {
      const arr1 = new ArrayList()
      expect(arr1.clear().size()).toBe(0)
    })
    it("on not empty returns first", () => {
      const arr1 = new ArrayList(["A", "T", "B"])
      expect(arr1.size()).toBe(3)
      expect(arr1.clear().size()).toBe(0)
    })
  })

  describe("remove()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.remove(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.remove(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.remove(1)).toThrow(IndexOutOfBoundError)
    })
    it("index -1 removes last", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(-1)
      expect(arr1.size()).toBe(1)
      expect(arr1.get(0)).toBe(5)
    })
    it("index -n removes last-n", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(-2)
      expect(arr1.size()).toBe(1)
      expect(arr1.get(0)).toBe(10)
    })
    it("index 0 removes first", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(0)
      expect(arr1.size()).toBe(1)
      expect(arr1.get(0)).toBe(10)
    })
    it("index n removes n", () => {
      const arr1 = new ArrayList([5, 10])
      arr1.remove(1)
      expect(arr1.size()).toBe(1)
      expect(arr1.get(0)).toBe(5)
    })
    it("index n >= length o nothing", () => {
      const arr1 = new ArrayList([5, 10])
      expect(() => arr1.remove(2)).toThrow(IndexOutOfBoundError)
    })
  })

  describe("delete()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.delete(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.delete(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.delete(1)).toThrow(IndexOutOfBoundError)
    })
    it("start -1 deletes last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(-1)
      expect(arr1.size()).toBe(4)
      expect(arr1.get(0)).toBe(5)
      expect(arr1.get(1)).toBe(10)
    })
    it("start -n deletes length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(-2)
      expect(arr1.size()).toBe(3)
      expect(arr1.get(0)).toBe(5)
    })
    it("start 0 deletes first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(0)
      expect(arr1.size()).toBe(0)
    })
    it("start n deletes n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(1)
      expect(arr1.size()).toBe(1)
      expect(arr1.get(0)).toBe(5)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.delete(5)).toThrow(IndexOutOfBoundError)
    })
    it("end before start throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.delete(2, 1)).toThrow(InvalidIndexError)
    })
    it("end after start correctly deletes", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(0, 2)
      expect(arr1.size()).toBe(3)
      expect(arr1.get(0)).toBe(15)
    })
    it("end after start 2 correctly deletes", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      arr1.delete(1, 2)
      expect(arr1.size()).toBe(4)
      expect(arr1.get(0)).toBe(5)
      expect(arr1.get(1)).toBe(15)
    })
  })

  describe("sub()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.sub(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.sub(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.sub(1)).toThrow(IndexOutOfBoundError)
    })
    it("start -1 subs last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(-1)
      expect(arr2.size()).toBe(1)
      expect(arr2.get(0)).toBe(25)
    })
    it("start -n subs length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(-2)
      expect(arr2.size()).toBe(2)
      expect(arr2.get(0)).toBe(20)
      expect(arr2.get(1)).toBe(25)
    })
    it("start 0 subs first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(0)
      expect(arr2.size()).toBe(5)
      expect(arr2.get(0)).toBe(5)
    })
    it("start n subs n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(1)
      expect(arr2.size()).toBe(4)
      expect(arr2.get(0)).toBe(10)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.sub(5)).toThrow(IndexOutOfBoundError)
    })
    it("end before start throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.sub(2, 1)).toThrow(InvalidIndexError)
    })
    it("end after start correctly subs", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(0, 2)
      expect(arr2.size()).toBe(2)
      expect(arr2.get(0)).toBe(5)
      expect(arr2.get(1)).toBe(10)
    })
    it("end after start 2 correctly subs", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.sub(1, 2)
      expect(arr2.size()).toBe(1)
      expect(arr2.get(0)).toBe(10)
    })
  })

  describe("insert()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.insert(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.insert(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.insert(1)).toThrow(IndexOutOfBoundError)
    })
    it("start -1 inserts last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(-1, [100])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(4)).toBe(100)
      expect(arr2.get(5)).toBe(25)
    })
    it("start -n inserts length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(-2, [100])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(3)).toBe(100)
      expect(arr2.get(4)).toBe(20)
    })
    it("start 0 inserts first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(0, [100])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(0)).toBe(100)
      expect(arr2.get(1)).toBe(5)
    })
    it("start n inserts n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.insert(1, [100])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(0)).toBe(5)
      expect(arr2.get(1)).toBe(100)
      expect(arr2.get(2)).toBe(10)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.insert(5)).toThrow(IndexOutOfBoundError)
    })
  })

  describe("replace()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.replace(undefined)).toThrow(InvalidIndexError)
      expect(() => arr1.replace(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.replace(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.replace(1)).toThrow(IndexOutOfBoundError)
    })
    it("start -1 replaces last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(-1, [100])
      expect(arr2.size()).toBe(5)
      expect(arr2.get(4)).toBe(100)
    })
    it("start -n replaces length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(-2, [100])
      expect(arr2.size()).toBe(5)
      expect(arr2.get(3)).toBe(100)
      expect(arr2.get(4)).toBe(25)
    })
    it("start 0 replaces first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(0, [100, 101])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(0)).toBe(100)
      expect(arr2.get(1)).toBe(101)
      expect(arr2.get(2)).toBe(10)
    })
    it("start n replaces n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replace(1, new ArrayList([100]))
      expect(arr2.size()).toBe(5)
      expect(arr2.get(0)).toBe(5)
      expect(arr2.get(1)).toBe(100)
      expect(arr2.get(2)).toBe(15)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.replace(5)).toThrow(IndexOutOfBoundError)
    })
  })

  describe("replaceFrom()", () => {
    it("on empty throws", () => {
      const arr1 = new ArrayList()
      expect(() => arr1.replaceFrom(undefined)).toThrow(InvalidIndexError)
      expect(() => arr1.replaceFrom(-1)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.replaceFrom(0)).toThrow(IndexOutOfBoundError)
      expect(() => arr1.replaceFrom(1)).toThrow(IndexOutOfBoundError)
    })
    it("start -1 replaceFroms last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(-1, [100, 101])
      expect(arr2.size()).toBe(6)
      expect(arr2.get(4)).toBe(100)
      expect(arr2.get(5)).toBe(101)
    })
    it("start -n replaceFroms length -n to end", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(-2, [100, 101])
      expect(arr2.size()).toBe(5)
      expect(arr2.get(3)).toBe(100)
      expect(arr2.get(4)).toBe(101)
    })
    it("start 0 replaceFroms first to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(0, [100, 101])
      expect(arr2.size()).toBe(5)
      expect(arr2.get(0)).toBe(100)
      expect(arr2.get(1)).toBe(101)
      expect(arr2.get(2)).toBe(15)
    })
    it("start n replaceFroms n to last", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      const arr2 = arr1.replaceFrom(1, new ArrayList([100, 101]))
      expect(arr2.size()).toBe(5)
      expect(arr2.get(0)).toBe(5)
      expect(arr2.get(1)).toBe(100)
      expect(arr2.get(2)).toBe(101)
      expect(arr2.get(3)).toBe(20)
    })
    it("start n >= length throws", () => {
      const arr1 = new ArrayList([5, 10, 15, 20, 25])
      expect(() => arr1.replaceFrom(5)).toThrow(IndexOutOfBoundError)
    })
  })

  describe("concat()", () => {
    it("on empty adds elements", () => {
      const arr1 = new ArrayList()
      arr1.concat([1], new ArrayList([2]))
      expect(arr1.getInner()).toStrictEqual([1, 2])
    })
    it("on empty with reduce", () => {
      const other = Lists.of({list: Lists.of(1, 2)})
      const numbers = other.stream().reduce((previousValue, currentValue) => {
        return currentValue.list.hasElements()
          ? previousValue.concat(currentValue.list)
          : previousValue
      }, new ArrayList())
      expect(numbers.getInner()).toStrictEqual([1, 2])
      expect(numbers.size()).toBe(2)
    })

    it("with undefined do nothing", () => {
      const arr1 = new ArrayList([5])
      arr1.concat(undefined)
      expect(arr1.getInner()).toStrictEqual([5])
    })

    it("on not empty adds elements", () => {
      const arr1 = new ArrayList([5])
      arr1.concat([1], new ArrayList([2]))
      expect(arr1.getInner()).toStrictEqual([5, 1, 2])
    })
  })

  describe("sort()", () => {
    it("on empty do nothing", () => {
      const arr1 = new ArrayList()
      arr1.sort(compareNumbers)
      expect(arr1.size()).toBe(0)
    })
    it("correctly sorts numbers", () => {
      const arr1 = new ArrayList([10, 6, 33, 85, 6, 5, 6])
      arr1.sort(compareNumbers)
      expect(arr1.getInner()).toStrictEqual([5, 6, 6, 6, 10, 33, 85])
    })
    it("correctly sorts strings", () => {
      const arr1 = new ArrayList(["10", "6", "33", "85", "6", "5", "6"])
      arr1.sort(compareStrings)
      expect(arr1.getInner()).toStrictEqual(["10", "33", "5", "6", "6", "6", "85"])
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
      expect(JSON.stringify(arr1.getInner())).toBe(
        JSON.stringify([gen(5), gen(6), gen(6), gen(6), gen(10), gen(33), gen(85)])
      )
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
      expect(JSON.stringify(arr1.getInner())).toBe(
        JSON.stringify([gen(5), gen(6), gen(6), gen(6), gen(10), gen(33), gen(85)])
      )
    })
  })
})
