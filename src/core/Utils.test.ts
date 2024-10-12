import {
  abstractArrayToArray,
  compareStringsIgnoreCase,
  containsMethod,
  containsProperty,
  containsPrototypeMethod,
  defined,
  equals,
  isList,
  notDefined,
  requireDefined
} from "./Utils"
import {InvalidArrayError, UndefinedError} from "../exceptions"
import {List} from "./List"
import {StaticArrayList} from "../list"

// @ts-expect-error
class DummyList implements List<any> {
  private readonly __iamList = true
  getInner(): Array<any> {
    return [5]
  }
}
describe("Utils", () => {
  describe("containsProperty()", () => {
    it("returns false", () => {
      expect(containsProperty(undefined, undefined)).toBeFalsy()
      expect(containsProperty(undefined, null)).toBeFalsy()
      expect(containsProperty(undefined, "")).toBeFalsy()
      expect(containsProperty(undefined, "key")).toBeFalsy()

      expect(containsProperty({}, undefined)).toBeFalsy()
      expect(containsProperty({}, null)).toBeFalsy()
      expect(containsProperty({}, "")).toBeFalsy()
      expect(containsProperty({}, "key")).toBeFalsy()

      expect(containsProperty({key: "value"}, undefined)).toBeFalsy()
      expect(containsProperty({key: "value"}, null)).toBeFalsy()
      expect(containsProperty({key: "value"}, "")).toBeFalsy()
      expect(containsProperty({key: "value"}, "keyT")).toBeFalsy()
    })

    it("returns true", () => {
      expect(containsProperty({key: "value"}, "key")).toBeTruthy()
      expect(
        containsProperty(
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
      expect(containsMethod(undefined, undefined)).toBeFalsy()
      expect(containsMethod(undefined, null)).toBeFalsy()
      expect(containsMethod(undefined, "")).toBeFalsy()
      expect(containsMethod(undefined, "key")).toBeFalsy()

      expect(containsMethod({}, undefined)).toBeFalsy()
      expect(containsMethod({}, null)).toBeFalsy()
      expect(containsMethod({}, "")).toBeFalsy()
      expect(containsMethod({}, "key")).toBeFalsy()

      expect(containsMethod({key: "value"}, undefined)).toBeFalsy()
      expect(containsMethod({key: "value"}, null)).toBeFalsy()
      expect(containsMethod({key: "value"}, "")).toBeFalsy()
      expect(containsMethod({key: "value"}, "key")).toBeFalsy()
    })

    it("returns true", () => {
      expect(
        containsMethod(
          {
            key() {
              return 1
            }
          },
          "key"
        )
      ).toBeTruthy()
      expect(
        containsMethod(
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

  describe("containsPrototypeMethod()", () => {
    it("returns false", () => {
      expect(containsPrototypeMethod(undefined, undefined)).toBeFalsy()
      expect(containsPrototypeMethod(undefined, null)).toBeFalsy()
      expect(containsPrototypeMethod(undefined, "")).toBeFalsy()
      expect(containsPrototypeMethod(undefined, "key")).toBeFalsy()

      expect(containsPrototypeMethod({}, undefined)).toBeFalsy()
      expect(containsPrototypeMethod({}, null)).toBeFalsy()
      expect(containsPrototypeMethod({}, "")).toBeFalsy()
      expect(containsPrototypeMethod({}, "key")).toBeFalsy()

      expect(containsPrototypeMethod({key: "value"}, undefined)).toBeFalsy()
      expect(containsPrototypeMethod({key: "value"}, null)).toBeFalsy()
      expect(containsPrototypeMethod({key: "value"}, "")).toBeFalsy()
      expect(containsPrototypeMethod({key: "value"}, "key")).toBeFalsy()
      expect(
        containsPrototypeMethod(
          {
            key: () => {
              return 1
            }
          },
          "key"
        )
      ).toBeFalsy()
    })

    it("returns true", () => {
      class Tt {
        hey() {
          return true
        }
      }

      expect(containsPrototypeMethod(new Tt(), "hey")).toBeTruthy()
    })
  })

  describe("defined()", () => {
    it("returns false", () => {
      expect(defined(undefined)).toBeFalsy()
      expect(defined(null)).toBeFalsy()
    })
    it("returns true", () => {
      expect(defined(true)).toBeTruthy()
      expect(defined(false)).toBeTruthy()
      expect(defined(0)).toBeTruthy()
      expect(defined("")).toBeTruthy()
      expect(defined({})).toBeTruthy()
      expect(defined([])).toBeTruthy()
      expect(defined("undefined")).toBeTruthy()
    })
  })

  describe("requireDefined()", () => {
    it("returns false", () => {
      expect(() => requireDefined(undefined)).toThrow(UndefinedError)
      expect(() => requireDefined(null)).toThrow(UndefinedError)
    })
    it("returns true", () => {
      expect(() => requireDefined(true)).not.toThrow()
      expect(() => requireDefined(false)).not.toThrow()
      expect(() => requireDefined(0)).not.toThrow()
      expect(() => requireDefined("")).not.toThrow()
      expect(() => requireDefined({})).not.toThrow()
      expect(() => requireDefined([])).not.toThrow()
      expect(() => requireDefined("undefined")).not.toThrow()
    })
  })

  describe("notDefined()", () => {
    it("returns true", () => {
      expect(notDefined(undefined)).toBeTruthy()
      expect(notDefined(null)).toBeTruthy()
    })
    it("returns false", () => {
      expect(notDefined(true)).toBe(false)
      expect(notDefined(false)).toBe(false)
      expect(notDefined(0)).toBe(false)
      expect(notDefined("")).toBe(false)
      expect(notDefined({})).toBe(false)
      expect(notDefined([])).toBe(false)
      expect(notDefined("undefined")).toBe(false)
    })
  })

  describe("equals()", () => {
    it("returns true", () => {
      expect(equals(undefined, undefined)).toBeTruthy()
      expect(equals(null, null)).toBeTruthy()
      expect(equals(0, 0)).toBeTruthy()
      expect(equals(1, 1)).toBeTruthy()
      expect(equals("", "")).toBeTruthy()
      expect(equals("t", "t")).toBeTruthy()
      expect(equals({equals: () => true}, {})).toBeTruthy()
    })
    it("returns false", () => {
      expect(equals(undefined, null)).toBe(false)
      expect(equals({}, {})).toBe(false)
      expect(equals([], [])).toBe(false)
      expect(equals(0, "0")).toBe(false)
      expect(equals({t: 1}, {t: 1})).toBe(false)
      expect(equals({t: 1}, {t: 2})).toBe(false)
      expect(equals([1], [1])).toBe(false)
      expect(equals([1], [2])).toBe(false)
    })
  })
  describe("isList()", () => {
    it("undefined returns false", () => {
      expect(isList(undefined)).toBe(false)
    })
    it("array returns false", () => {
      expect(isList(["a"])).toBe(false)
    })
    it("object returns false", () => {
      expect(isList({a: () => ({})})).toBe(false)
    })
    it("sub returns true", () => {
      expect(isList({getInner: () => ({})})).toBe(false)
      expect(isList(new DummyList())).toBeTruthy()
    })
    it("other returns false", () => {
      expect(isList(1)).toBe(false)
      expect(isList("")).toBe(false)
      expect(isList("1")).toBe(false)
    })
    it("sub returns ok", () => {
      console.log("")
      const list = new StaticArrayList([])
      console.log(list)
      expect(isList(list)).toBeTruthy()
    })
  })

  describe("abstractArrayToArray()", () => {
    it("returns inner if List", () => {
      // @ts-expect-error
      const a = abstractArrayToArray(new DummyList())
      expect(a[0]).toBe(5)
    })
    it("returns array if array", () => {
      const a = abstractArrayToArray([5])
      expect(a[0]).toBe(5)
    })
    it("throws if not list or array", () => {
      expect(() => {
        // @ts-expect-error
        abstractArrayToArray(6546)
      }).toThrow(InvalidArrayError)
    })
  })

  describe("compareStringsIgnoreCase()", () => {
    it("with left undefined returns -1", () => {
      expect(compareStringsIgnoreCase(undefined, "ze")).toBe(-1)
    })
    it("with right undefined returns 1", () => {
      expect(compareStringsIgnoreCase("ze", undefined)).toBe(1)
    })
    it("with left and right undefined returns 0", () => {
      expect(compareStringsIgnoreCase(undefined, undefined)).toBe(0)
    })
    it("with left defined and right other returns throws", () => {
      expect(() => compareStringsIgnoreCase("ez", 0 as any)).toThrow
    })
    it("with left other and right defined returns throws", () => {
      expect(() => compareStringsIgnoreCase(0 as any, "ez")).toThrow
    })
  })
})
