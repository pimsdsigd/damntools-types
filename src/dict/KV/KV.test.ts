import {expect} from "chai"
import {KV} from "./KV"
import {Optional} from "../../optional"

describe("KV", () => {
  describe("constructor()", () => {
    it("not defined initializes empty", () => {
      const dict = KV.empty()
      expect(dict.size()).to.be.equals(0)
    })

    it("obj initializes empty", () => {
      const dict = KV.from({a: 5})
      expect(dict.size()).to.be.equals(1)
    })
  })

  describe("put()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.put("b", 10)
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from({a: 5})
      dict.put("b", 10)
      expect(dict.size()).to.be.equals(2)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("with undefined adds one", () => {
      const dict = KV.empty()
      dict.put("b", undefined)
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.undefined
    })
  })

  describe("putAll()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.putAll({b: 10})
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from({a: 5})
      dict.putAll({b: 10})
      expect(dict.size()).to.be.equals(2)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("multiple provided adds", () => {
      const dict = KV.empty()
      dict.putAll({b: 10}, {c: 20})
      expect(dict.size()).to.be.equals(2)
      expect(dict.get("b")).to.be.equals(10)
      expect(dict.get("c")).to.be.equals(20)
    })

    it("replacement of existing", () => {
      const dict = KV.from({a: 5})
      dict.putAll({a: 10})
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("a")).to.be.equals(10)
    })

    it("replacement of provided", () => {
      const dict = KV.empty()
      dict.putAll({b: 10}, {b: 15})
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.equals(15)
    })
  })

  describe("merge()", () => {
    it("on empty adds one", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}))
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("on not empty adds one", () => {
      const dict = KV.from({a: 5})
      dict.merge(KV.from({b: 10}))
      expect(dict.size()).to.be.equals(2)
      expect(dict.get("b")).to.be.equals(10)
    })

    it("multiple provided adds", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}), KV.from({c: 20}))
      expect(dict.size()).to.be.equals(2)
      expect(dict.get("b")).to.be.equals(10)
      expect(dict.get("c")).to.be.equals(20)
    })

    it("replacement of existing", () => {
      const dict = KV.from({a: 5})
      dict.merge(KV.from({a: 10}))
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("a")).to.be.equals(10)
    })

    it("replacement of provided", () => {
      const dict = KV.empty()
      dict.merge(KV.from({b: 10}), KV.from({b: 15}))
      expect(dict.size()).to.be.equals(1)
      expect(dict.get("b")).to.be.equals(15)
    })
  })

  describe("hasKey()", () => {
    it("on empty returns false", () => {
      const dict = KV.empty()
      expect(dict.hasKey("d")).to.be.false
    })
    it("on not found returns false", () => {
      const dict = KV.from({a: 10})
      expect(dict.hasKey("d")).to.be.false
    })
    it("on found returns true", () => {
      const dict = KV.from({a: 10})
      expect(dict.hasKey("a")).to.be.true
    })
    it("on found undefined returns true", () => {
      const dict = KV.from({a: undefined})
      expect(dict.hasKey("a")).to.be.true
    })
  })

  describe("clear()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      dict.clear()
      expect(dict.size()).to.be.equals(0)
    })
    it("on not empty returns empty", () => {
      const dict = KV.from({a: 10})
      dict.clear()
      expect(dict.size()).to.be.equals(0)
    })
  })

  describe("remove()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      dict.remove("a")
      expect(dict.size()).to.be.equals(0)
    })
    it("on not found does nothing", () => {
      const dict = KV.from({a: 10})
      expect(dict.size()).to.be.equals(1)
      dict.remove("b")
      expect(dict.size()).to.be.equals(1)
    })
    it("on found removes", () => {
      const dict = KV.from({a: 10})
      expect(dict.size()).to.be.equals(1)
      dict.remove("a")
      expect(dict.size()).to.be.equals(0)
      expect(dict.hasKey("a")).to.be.false
    })
  })

  describe("get()", () => {
    it("on not found returns undefined", () => {
      const dict = KV.empty()
      expect(dict.get("a")).to.be.undefined
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      expect(dict.get("a")).to.be.equals(10)
    })
  })

  describe("getOrDefault()", () => {
    it("on not found returns default", () => {
      const dict = KV.empty()
      expect(dict.getOrDefault("a", null)).to.be.null
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      expect(dict.getOrDefault("a", null)).to.be.equals(10)
    })
  })

  describe("getOptional()", () => {
    it("on not found returns empty", () => {
      const dict = KV.empty()
      expect(dict.getOptional("a")).to.be.equals(Optional.EMPTY)
    })
    it("on found returns value", () => {
      const dict = KV.from({a: 10})
      const optional = dict.getOptional("a")
      expect(optional.isPresent()).to.be.true
      expect(optional.get()).to.be.equals(10)
    })
  })

  describe("keys()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.keys().size()).to.be.equals(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.keys().size()).to.be.equals(1)
      expect(dict.keys().get(0)).to.be.equals("a")
    })
  })

  describe("values()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.values().size()).to.be.equals(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.values().size()).to.be.equals(1)
      expect(dict.values().get(0)).to.be.equals(10)
    })
  })

  describe("entries()", () => {
    it("on empty returns empty", () => {
      const dict = KV.empty()
      expect(dict.entries().size()).to.be.equals(0)
    })
    it("on not empty returns keys", () => {
      const dict = KV.from({a: 10})
      expect(dict.entries().size()).to.be.equals(1)
      const entry = dict.entries().get(0)
      expect(entry.key).to.be.equals("a")
      expect(entry.value).to.be.equals(10)
    })
  })

  describe("copy()", () => {
    it("modify new does not modify previous", () => {
      const dict = KV.from({a: 10})
      const dict2 = dict.copy()
      expect(dict.get("a")).to.be.equals(10)
      expect(dict2.get("a")).to.be.equals(10)
      dict.put("a", 15)
      expect(dict.get("a")).to.be.equals(15)
      expect(dict2.get("a")).to.be.equals(10)
    })
  })

  describe("equals()", () => {
    it("on other not defined returns false", () => {
      const dict = KV.from({a: 10})
      const dict2 = undefined
      expect(dict.equals(dict2)).to.be.false
    })
    it("on other different size returns false", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({b: 20, c: 30})
      expect(dict.equals(dict2)).to.be.false
    })
    it("on same keys and values returns true", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({a: 10})
      expect(dict.equals(dict2)).to.be.true
    })
    it("on same keys and different values returns true", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({a: 15})
      expect(dict.equals(dict2)).to.be.false
    })
    it("on different keys returns true", () => {
      const dict = KV.from({a: 10})
      const dict2 = KV.from({b: 15})
      expect(dict.equals(dict2)).to.be.false
    })
  })

  describe("select()", () => {
    it("correctly returns one key", () => {
      const dict = KV.from({a: 10, b: 20})
      const select = dict.select(entry => entry.value === 20)
      expect(select.values().size()).to.be.equals(1)
      expect(select.values().get(0)).to.be.equals(20)
    })
    it("correctly returns multiple key", () => {
      const dict = KV.from({a: 10, b: 20})
      const select = dict.select(entry => typeof entry.value === "number")
      expect(select.values().size()).to.be.equals(2)
      expect(select.get("a")).to.be.equals(10)
      expect(select.get("b")).to.be.equals(20)
    })
  })

  describe("count()", () => {
    it("correctly returns one key", () => {
      const dict = KV.from({a: 10, b: 20})
      const count = dict.count(entry => entry.value === 20)
      expect(count).to.be.equals(1)
    })
    it("correctly returns multiple key", () => {
      const dict = KV.from({a: 10, b: 20, c: "50"})
      const count = dict.count(entry => typeof entry.value === "number")
      expect(count).to.be.equals(2)
    })
  })

  describe("filter()", () => {
    it("correctly filters one key", () => {
      const dict = KV.from({a: 10, b: 20})
      expect(dict.size()).to.be.equals(2)
      dict.filter(entry => entry.value === 20)
      expect(dict.size()).to.be.equals(1)
    })
    it("correctly filters multiple key", () => {
      const dict = KV.from({a: 10, b: 20, c: "50"})
      expect(dict.size()).to.be.equals(3)
      dict.filter(entry => typeof entry.value === "number")
      expect(dict.size()).to.be.equals(2)
    })
  })

  describe("findOptional()", () => {
    it("not found returns empty", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => entry.value === 30)
      expect(value).to.be.equals(Optional.EMPTY)
    })
    it("correctly returns value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => entry.value === 20)
      expect(value.isPresent()).to.be.true
      expect(value.get()).to.be.equals(20)
    })
    it("multiple founds correctly returns first value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.findOptional(entry => typeof entry.value === "number")
      expect(value.isPresent()).to.be.true
      expect(value.get()).to.be.equals(10)
    })
    it("undefined found correctly returns empty", () => {
      const dict = KV.from({a: undefined, b: 20, c: "50"})
      const value = dict.findOptional(entry => entry.key === "a")
      expect(value).to.be.equals(Optional.EMPTY)
    })
  })

  describe("find()", () => {
    it("not found returns undefined", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.find(entry => entry.value === 30)
      expect(value).to.be.undefined
    })
    it("correctly returns value", () => {
      const dict = KV.from({a: 10, b: 20})
      const value = dict.find(entry => entry.value === 20)
      expect(value).to.be.equals(20)
    })
    it("undefined found correctly returns undefined", () => {
      const dict = KV.from({a: undefined, b: 20, c: "50"})
      const value = dict.find(entry => entry.key === "a")
      expect(value).to.be.undefined
    })
  })

  describe("hasElements()", () => {
    it("empty returns false", () => {
      const dict = KV.empty()
      expect(dict.hasElements()).to.be.false
    })
    it("not empty returns true", () => {
      const dict = KV.from({a: 10})
      expect(dict.hasElements()).to.be.true
    })
  })

  describe("isEmpty()", () => {
    it("empty returns true", () => {
      const dict = KV.empty()
      expect(dict.isEmpty()).to.be.true
    })
    it("not empty returns false", () => {
      const dict = KV.from({a: 10})
      expect(dict.isEmpty()).to.be.false
    })
  })
})
