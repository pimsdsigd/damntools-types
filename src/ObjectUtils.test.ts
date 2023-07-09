import {expect} from "chai"
import {ObjectUtils} from "./ObjectUtils"
import {ArrayList} from "./list"
import {Lists} from "./utils"

describe("ObjectUtils", () => {
  describe("containsProperty()", () => {
    it("returns false", () => {
      expect(ObjectUtils.containsProperty(undefined, undefined)).to.be.false
      expect(ObjectUtils.containsProperty(undefined, null)).to.be.false
      expect(ObjectUtils.containsProperty(undefined, "")).to.be.false
      expect(ObjectUtils.containsProperty(undefined, "key")).to.be.false

      expect(ObjectUtils.containsProperty({}, undefined)).to.be.false
      expect(ObjectUtils.containsProperty({}, null)).to.be.false
      expect(ObjectUtils.containsProperty({}, "")).to.be.false
      expect(ObjectUtils.containsProperty({}, "key")).to.be.false

      expect(ObjectUtils.containsProperty({key: "value"}, undefined)).to.be.false
      expect(ObjectUtils.containsProperty({key: "value"}, null)).to.be.false
      expect(ObjectUtils.containsProperty({key: "value"}, "")).to.be.false
      expect(ObjectUtils.containsProperty({key: "value"}, "keyT")).to.be.false
    })

    it("returns true", () => {
      expect(ObjectUtils.containsProperty({key: "value"}, "key")).to.be.true
      expect(
        ObjectUtils.containsProperty(
          {
            key() {
              return 1
            }
          },
          "key"
        )
      ).to.be.true
    })
  })

  describe("containsMethod()", () => {
    it("returns false", () => {
      expect(ObjectUtils.containsMethod(undefined, undefined)).to.be.false
      expect(ObjectUtils.containsMethod(undefined, null)).to.be.false
      expect(ObjectUtils.containsMethod(undefined, "")).to.be.false
      expect(ObjectUtils.containsMethod(undefined, "key")).to.be.false

      expect(ObjectUtils.containsMethod({}, undefined)).to.be.false
      expect(ObjectUtils.containsMethod({}, null)).to.be.false
      expect(ObjectUtils.containsMethod({}, "")).to.be.false
      expect(ObjectUtils.containsMethod({}, "key")).to.be.false

      expect(ObjectUtils.containsMethod({key: "value"}, undefined)).to.be.false
      expect(ObjectUtils.containsMethod({key: "value"}, null)).to.be.false
      expect(ObjectUtils.containsMethod({key: "value"}, "")).to.be.false
      expect(ObjectUtils.containsMethod({key: "value"}, "key")).to.be.false
    })

    it("returns true", () => {
      expect(
        ObjectUtils.containsMethod(
          {
            key() {
              return 1
            }
          },
          "key"
        )
      ).to.be.true
      expect(
        ObjectUtils.containsMethod(
          {
            key: () => {
              return 1
            }
          },
          "key"
        )
      ).to.be.true
    })
  })

  describe("cloneObject()", () => {
    it("returns correct", () => {
      const obj = {a: [{b: 1}]}
      const clone = ObjectUtils.cloneObject(obj)
      // @ts-ignore
      expect(clone.a.length).to.be.equals(1)
      // @ts-ignore
      expect(clone.a[0].b).to.be.equals(1)
    })
  })

  describe("entries()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.entries({key: 5})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(1)
      expect(entries.get(0)[0]).to.be.equals("key")
      expect(entries.get(0)[1]).to.be.equals(5)
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.entries({})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(0)
    })
  })

  describe("fromEntries()", () => {
    it("returns correct entries when not empty", () => {
      const obj = ObjectUtils.fromEntries(Lists.from([["key", 5]]))
      expect(obj).to.be.instanceof(Object)
      // @ts-ignore
      expect(obj.key).to.be.equals(5)
    })
    it("returns correct entries when empty", () => {
      const obj = ObjectUtils.fromEntries(Lists.from([]))
      expect(obj).to.be.instanceof(Object)
    })
  })

  describe("keys()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.keys({key: 5})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(1)
      expect(entries.get(0)).to.be.equals("key")
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.keys({})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(0)
    })
  })

  describe("values()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.values({key: 5})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(1)
      expect(entries.get(0)).to.be.equals(5)
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.values({})
      expect(entries).to.be.instanceof(ArrayList)
      expect(entries.size()).to.be.equals(0)
    })
  })
})
