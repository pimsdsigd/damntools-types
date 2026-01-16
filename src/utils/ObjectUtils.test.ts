import {ObjectUtils} from "./ObjectUtils"
import {ArrayList} from "../list"
import {KV} from "../dict"
import {Optional} from "../optional"
import {Lists} from "./Lists"

describe("ObjectUtils", () => {
  describe("containsProperty()", () => {
    it("returns false", () => {
      expect(ObjectUtils.containsProperty(undefined, undefined)).toBeFalsy()
      expect(ObjectUtils.containsProperty(undefined, null)).toBeFalsy()
      expect(ObjectUtils.containsProperty(undefined, "")).toBeFalsy()
      expect(ObjectUtils.containsProperty(undefined, "key")).toBeFalsy()

      expect(ObjectUtils.containsProperty({}, undefined)).toBeFalsy()
      expect(ObjectUtils.containsProperty({}, null)).toBeFalsy()
      expect(ObjectUtils.containsProperty({}, "")).toBeFalsy()
      expect(ObjectUtils.containsProperty({}, "key")).toBeFalsy()

      expect(ObjectUtils.containsProperty({key: "value"}, undefined)).toBeFalsy()
      expect(ObjectUtils.containsProperty({key: "value"}, null)).toBeFalsy()
      expect(ObjectUtils.containsProperty({key: "value"}, "")).toBeFalsy()
      expect(ObjectUtils.containsProperty({key: "value"}, "keyT")).toBeFalsy()
    })

    it("returns true", () => {
      expect(ObjectUtils.containsProperty({key: "value"}, "key")).toBeTruthy()
      expect(
        ObjectUtils.containsProperty(
          {
            key() {
              return 1
            }
          },
          "key"
        )
      ).toBeTruthy()
    })
  })

  describe("containsMethod()", () => {
    it("returns false", () => {
      expect(ObjectUtils.containsMethod(undefined, undefined)).toBeFalsy()
      expect(ObjectUtils.containsMethod(undefined, null)).toBeFalsy()
      expect(ObjectUtils.containsMethod(undefined, "")).toBeFalsy()
      expect(ObjectUtils.containsMethod(undefined, "key")).toBeFalsy()

      expect(ObjectUtils.containsMethod({}, undefined)).toBeFalsy()
      expect(ObjectUtils.containsMethod({}, null)).toBeFalsy()
      expect(ObjectUtils.containsMethod({}, "")).toBeFalsy()
      expect(ObjectUtils.containsMethod({}, "key")).toBeFalsy()

      expect(ObjectUtils.containsMethod({key: "value"}, undefined)).toBeFalsy()
      expect(ObjectUtils.containsMethod({key: "value"}, null)).toBeFalsy()
      expect(ObjectUtils.containsMethod({key: "value"}, "")).toBeFalsy()
      expect(ObjectUtils.containsMethod({key: "value"}, "key")).toBeFalsy()
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
      ).toBeTruthy()
      expect(
        ObjectUtils.containsMethod(
          {
            key: () => {
              return 1
            }
          },
          "key"
        )
      ).toBeTruthy()
    })
  })

  describe("cloneObject()", () => {
    it("returns correct", () => {
      const obj = {a: [{b: 1}]}
      const clone = ObjectUtils.cloneObject(obj)
      // @ts-expect-error
      expect(clone.a.length).toBe(1)
      // @ts-expect-error
      expect(clone.a[0].b).toBe(1)
    })
  })

  describe("entries()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.entries({key: 5})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(1)
      expect(entries.get(0)[0]).toBe("key")
      expect(entries.get(0)[1]).toBe(5)
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.entries({})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(0)
    })
  })

  describe("fromEntries()", () => {
    it("returns correct entries when not empty", () => {
      const obj = ObjectUtils.fromEntries(Lists.from([["key", 5]]))
      expect(obj).toBeInstanceOf(Object)
      // @ts-expect-error
      expect(obj.key).toBe(5)
    })
    it("returns correct entries when empty", () => {
      const obj = ObjectUtils.fromEntries(Lists.from([]))
      expect(obj).toBeInstanceOf(Object)
    })
  })

  describe("keys()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.keys({key: 5})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(1)
      expect(entries.get(0)).toBe("key")
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.keys({})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(0)
    })
  })

  describe("values()", () => {
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.values({key: 5})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(1)
      expect(entries.get(0)).toBe(5)
    })
    it("returns correct entries when not empty", () => {
      const entries = ObjectUtils.values({})
      expect(entries).toBeInstanceOf(ArrayList)
      expect(entries.size()).toBe(0)
    })
  })
  describe("pathModifier()", () => {
    it("correctly creates nested", () => {
      const obj = {}
      ObjectUtils.pathModifier(obj, "path.test", 654)
      // @ts-expect-error
      expect(obj.path.test).toBe(654)
    })
    it("preserve existing", () => {
      const obj = {
        yolo: "",
        path: {
          ex: 54
        }
      }
      ObjectUtils.pathModifier(obj, "path.test", 654)
      expect(obj.yolo).toBe("")
      // @ts-expect-error
      expect(obj.path.test).toBe(654)
      expect(obj.path.ex).toBe(54)
    })
    it("with custom separator", () => {
      const obj = {
        yolo: "",
        path: {
          ex: 54
        }
      }
      ObjectUtils.pathModifier(obj, "path@test@yolo@ppt.opp", 654, "@")
      expect(obj.yolo).toBe("")
      expect(obj.path.ex).toBe(54)
      // @ts-expect-error
      expect(obj.path.test.yolo["ppt.opp"]).toBe(654)
    })
  })

  describe("simplifyDeeply()", () => {
    it("correctly creates nested", () => {
      const obj = Lists.of({
        a: 6,
        b: KV.from({aa: Optional.of(5)})
      })
      console.log(ObjectUtils.simplifyDeeply(obj))

      const test = {
        m: [{a: "1"}]
      }
      const test2 = {
        m: {0: {a: "2"}}
      }
      console.log({...test, ...test2})
    })
  })

  describe("flatten()", () => {
    it("correctly creates nested", () => {
      const obj = {
        a: 5,
        b: {
          ba: "cgfdf",
          bb: true,
          bv: false,
          bd: {
            d: [1]
          }
        },
        c: Lists.of(654, 655),
        d: KV.from({yo: 654})
      }
      const flat = ObjectUtils.flatten(obj)
      console.log(flat)
    })
  })

  describe("mergeDeeply()", () => {
    it("correctly creates nested", () => {
      const obj = {
        a: 5,
        b: {
          ba: "cgfdf",
          bb: true,
          bv: false,
          bd: {
            d: [1]
          }
        },
        c: Lists.of(654, 655),
        d: KV.from({yo: 654})
      }
      const mod = {a: 6, b: {bb: false, bd: {d: [2]}}}
      const flat = ObjectUtils.mergeDeeply(obj, mod)
      console.log(flat)
    })
  })
})
