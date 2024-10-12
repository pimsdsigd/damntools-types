import {KV} from "./KV"
import {Optional} from "../../optional"

describe("KV", () => {
  describe("constructor()", () => {
    it("not defined initializes empty", () => {
      const dict = KV.empty()
      expect(dict.size()).toBe(0)
    })

    it("obj initializes empty", () => {
      const dict = KV.from({a: 5})
      expect(dict.size()).toBe(1)
    })
  })

  describe("put()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.put("b", 10)
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBe(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from<string, number>({a: 5, c: 10})
      dict.put("b", 10)
      expect(dict.size()).toBe(3)
      expect(dict.get("b")).toBe(10)
    })

    it("with undefined adds one", () => {
      const dict = KV.empty()
      dict.put("b", undefined)
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBeUndefined()
    })
  })

  describe("putAll()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.putAll({b: 10})
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBe(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from<string, number>({a: 5})
      dict.putAll({b: 10})
      expect(dict.size()).toBe(2)
      expect(dict.get("b")).toBe(10)
    })

    it("multiple provided adds", () => {
      const dict = KV.empty()
      dict.putAll({b: 10}, {c: 20})
      expect(dict.size()).toBe(2)
      expect(dict.get("b")).toBe(10)
      expect(dict.get("c")).toBe(20)
    })

    it("replacement of existing", () => {
      const dict = KV.from({a: 5})
      dict.putAll({a: 10})
      expect(dict.size()).toBe(1)
      expect(dict.get("a")).toBe(10)
    })

    it("replacement of provided", () => {
      const dict = KV.empty()
      dict.putAll({b: 10}, {b: 15})
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBe(15)
    })
  })

  describe("merge()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}))
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBe(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from<string, number>({a: 5})
      dict.merge(KV.from({b: 10}))
      expect(dict.size()).toBe(2)
      expect(dict.get("b")).toBe(10)
    })

    it("multiple provided adds", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}), KV.from({c: 20}))
      expect(dict.size()).toBe(2)
      expect(dict.get("b")).toBe(10)
      expect(dict.get("c")).toBe(20)
    })

    it("replacement of existing", () => {
      const dict = KV.from({a: 5})
      dict.merge(KV.from({a: 10}))
      expect(dict.size()).toBe(1)
      expect(dict.get("a")).toBe(10)
    })

    it("replacement of provided", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}), KV.from({b: 15}))
      expect(dict.size()).toBe(1)
      expect(dict.get("b")).toBe(15)
    })
  })

  describe("hasKey()", () => {
    it("on empty returns false", () => {
      const dict = KV.empty()
      expect(dict.hasKey("d")).toBe(false)
    })
    it("on not found returns false", () => {
      const dict = KV.from<string, number>({a: 10})
      expect(dict.hasKey("d")).toBe(false)
    })
    it("on found returns true", () => {
      const dict = KV.from({a: 10})
      expect(dict.hasKey("a")).toBeTruthy()
    })
    it("on found undefined returns true", () => {
      const dict = KV.from({a: undefined})
      expect(dict.hasKey("a")).toBeTruthy()
    })
  })

  describe("clear()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      dict.clear()
      expect(dict.size()).toBe(0)
    })
    it("on not empty returns empty", () => {
      const dict = KV.from({a: 10})
      dict.clear()
      expect(dict.size()).toBe(0)
    })
  })

  describe("remove()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      dict.remove("a")
      expect(dict.size()).toBe(0)
    })
    it("on not found does nothing", () => {
      const dict = KV.from<string, number>({a: 10})
      expect(dict.size()).toBe(1)
      dict.remove("b")
      expect(dict.size()).toBe(1)
    })
    it("on found removes", () => {
      const dict = KV.from({a: 10})
      expect(dict.size()).toBe(1)
      dict.remove("a")
      expect(dict.size()).toBe(0)
      expect(dict.hasKey("a")).toBe(false)
    })
  })

  describe("get()", () => {
    it("on not found returns undefined", () => {
      const dict = KV.empty()
      expect(dict.get("a")).toBeUndefined()
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      expect(dict.get("a")).toBe(10)
    })
  })

  describe("getOrDefault()", () => {
    it("on not found returns default", () => {
      const dict = KV.empty()
      expect(dict.getOrDefault("a", null)).toBeNull()
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      expect(dict.getOrDefault("a", null)).toBe(10)
    })
  })

  describe("getOptional()", () => {
    it("on not found returns empty", () => {
      const dict = KV.empty()
      expect(dict.getOptional("a")).toBe(Optional.empty())
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      const optional = dict.getOptional("a")
      expect(optional.isPresent()).toBeTruthy()
      expect(optional.get()).toBe(10)
    })
  })

  describe("keys()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.keys().size()).toBe(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.keys().size()).toBe(1)
      expect(dict.keys().get(0)).toBe("a")
    })
  })

  describe("values()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.values().size()).toBe(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.values().size()).toBe(1)
      expect(dict.values().get(0)).toBe(10)
    })
  })

  describe("entries()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.entries().size()).toBe(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.entries().size()).toBe(1)
      const entry = dict.entries().get(0)
      expect(entry.key).toBe("a")
      expect(entry.value).toBe(10)
    })
  })

  describe("copy()", () => {
    it("modify new does not modify previous", () => {
      const dict = KV.from({a: 10})
      const dict2 = dict.copy()
      expect(dict.get("a")).toBe(10)
      expect(dict2.get("a")).toBe(10)
      dict.put("a", 15)
      expect(dict.get("a")).toBe(15)
      expect(dict2.get("a")).toBe(10)
    })
  })

  describe("equals()", () => {
    it("on other not defined returns false", () => {
      const dict = KV.from({a: 10})
      const dict2 = undefined
      expect(dict.equals(dict2)).toBe(false)
    })
    it("on other different size returns false", () => {
      const dict = KV.from<string, number>({a: 10})
      const dict2 = KV.from({b: 20, c: 30})
      expect(dict.equals(dict2)).toBe(false)
    })
    it("on same keys and values returns true", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({a: 10})
      expect(dict.equals(dict2)).toBeTruthy()
    })
    it("on same keys and different values returns true", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({a: 15})
      expect(dict.equals(dict2)).toBe(false)
    })
    it("on different keys returns true", () => {
      const dict = KV.from<string, number>({a: 10})
      const dict2 = KV.from({b: 15})
      expect(dict.equals(dict2)).toBe(false)
    })
  })

  describe("select()", () => {
    it("correctly returns one key", () => {
      const dict = KV.from({a: 10, b: 20})
      const select = dict.select(entry => entry.value === 20)
      expect(select.values().size()).toBe(1)
      expect(select.values().get(0)).toBe(20)
    })
    it("correctly returns multiple key", () => {
      const dict = KV.from({a: 10, b: 20})
      const select = dict.select(entry => typeof entry.value === "number")
      expect(select.values().size()).toBe(2)
      expect(select.get("a")).toBe(10)
      expect(select.get("b")).toBe(20)
    })
  })

  describe("count()", () => {
    it("correctly returns one key", () => {
      const dict = KV.from({a: 10, b: 20})
      const count = dict.count(entry => entry.value === 20)
      expect(count).toBe(1)
    })
    it("correctly returns multiple key", () => {
      const dict = KV.from({a: 10, b: 20, c: "50"})
      const count = dict.count(entry => typeof entry.value === "number")
      expect(count).toBe(2)
    })
  })

  describe("filter()", () => {
    it("correctly filters one key", () => {
      const dict = KV.from({a: 10, b: 20})
      expect(dict.size()).toBe(2)
      dict.filter(entry => entry.value === 20)
      expect(dict.size()).toBe(1)
    })
    it("correctly filters multiple key", () => {
      const dict = KV.from({a: 10, b: 20, c: "50"})
      expect(dict.size()).toBe(3)
      dict.filter(entry => typeof entry.value === "number")
      expect(dict.size()).toBe(2)
    })
  })

  describe("findOptional()", () => {
    it("not found returns empty", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => entry.value === 30)
      expect(value).toStrictEqual(Optional.empty())
    })
    it("correctly returns value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => entry.value === 20)
      expect(value.isPresent()).toBeTruthy()
      expect(value.get()).toBe(20)
    })
    it("multiple founds correctly returns first value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => typeof entry.value === "number")
      expect(value.isPresent()).toBeTruthy()
      expect(value.get()).toBe(10)
    })
    it("undefined found correctly returns empty", () => {
      const dict = KV.from({a: undefined, b: 20, c: "50"})
      const value = dict.findOptional(entry => entry.key === "a")
      expect(value).toStrictEqual(Optional.empty())
    })
  })

  describe("find()", () => {
    it("not found returns undefined", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.find(entry => entry.value === 30)
      expect(value).toBeUndefined()
    })
    it("correctly returns value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.find(entry => entry.value === 20)
      expect(value).toBe(20)
    })
    it("undefined found correctly returns undefined", () => {
      const dict = KV.from({a: undefined, b: 20, c: "50"})
      const value = dict.find(entry => entry.key === "a")
      expect(value).toBeUndefined()
    })
  })

  describe("hasElements()", () => {
    it("empty returns false", () => {
      const dict = KV.empty()
      expect(dict.hasElements()).toBe(false)
    })
    it("not empty returns true", () => {
      const dict = KV.from({a: 10})
      expect(dict.hasElements()).toBeTruthy()
    })
  })

  describe("isEmpty()", () => {
    it("empty returns true", () => {
      const dict = KV.empty()
      expect(dict.isEmpty()).toBeTruthy()
    })
    it("not empty returns false", () => {
      const dict = KV.from({a: 10})
      expect(dict.isEmpty()).toBe(false)
    })
  })
})
