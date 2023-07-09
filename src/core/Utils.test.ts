import {expect} from "chai"
import {
  abstractArrayToArray,
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

// @ts-ignore
class DummyList implements List<any> {
  getInner(): Array<any> {
    return [5]
  }
}
describe("Utils", () => {
  describe("containsProperty()", () => {
    it("returns false", () => {
      expect(containsProperty(undefined, undefined)).to.be.false
      expect(containsProperty(undefined, null)).to.be.false
      expect(containsProperty(undefined, "")).to.be.false
      expect(containsProperty(undefined, "key")).to.be.false

      expect(containsProperty({}, undefined)).to.be.false
      expect(containsProperty({}, null)).to.be.false
      expect(containsProperty({}, "")).to.be.false
      expect(containsProperty({}, "key")).to.be.false

      expect(containsProperty({key: "value"}, undefined)).to.be.false
      expect(containsProperty({key: "value"}, null)).to.be.false
      expect(containsProperty({key: "value"}, "")).to.be.false
      expect(containsProperty({key: "value"}, "keyT")).to.be.false
    })

    it("returns true", () => {
      expect(containsProperty({key: "value"}, "key")).to.be.true
      expect(
        containsProperty(
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
      expect(containsMethod(undefined, undefined)).to.be.false
      expect(containsMethod(undefined, null)).to.be.false
      expect(containsMethod(undefined, "")).to.be.false
      expect(containsMethod(undefined, "key")).to.be.false

      expect(containsMethod({}, undefined)).to.be.false
      expect(containsMethod({}, null)).to.be.false
      expect(containsMethod({}, "")).to.be.false
      expect(containsMethod({}, "key")).to.be.false

      expect(containsMethod({key: "value"}, undefined)).to.be.false
      expect(containsMethod({key: "value"}, null)).to.be.false
      expect(containsMethod({key: "value"}, "")).to.be.false
      expect(containsMethod({key: "value"}, "key")).to.be.false
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
      ).to.be.true
      expect(
        containsMethod(
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

  describe("containsPrototypeMethod()", () => {
    it("returns false", () => {
      expect(containsPrototypeMethod(undefined, undefined)).to.be.false
      expect(containsPrototypeMethod(undefined, null)).to.be.false
      expect(containsPrototypeMethod(undefined, "")).to.be.false
      expect(containsPrototypeMethod(undefined, "key")).to.be.false

      expect(containsPrototypeMethod({}, undefined)).to.be.false
      expect(containsPrototypeMethod({}, null)).to.be.false
      expect(containsPrototypeMethod({}, "")).to.be.false
      expect(containsPrototypeMethod({}, "key")).to.be.false

      expect(containsPrototypeMethod({key: "value"}, undefined)).to.be.false
      expect(containsPrototypeMethod({key: "value"}, null)).to.be.false
      expect(containsPrototypeMethod({key: "value"}, "")).to.be.false
      expect(containsPrototypeMethod({key: "value"}, "key")).to.be.false
      expect(
        containsPrototypeMethod(
          {
            key: () => {
              return 1
            }
          },
          "key"
        )
      ).to.be.false
    })

    it("returns true", () => {
      class Tt {
        hey() {
          return true
        }
      }

      expect(containsPrototypeMethod(new Tt(), "hey")).to.be.true
    })
  })

  describe("defined()", () => {
    it("returns false", () => {
      expect(defined(undefined)).to.be.false
      expect(defined(null)).to.be.false
    })
    it("returns true", () => {
      expect(defined(true)).to.be.true
      expect(defined(false)).to.be.true
      expect(defined(0)).to.be.true
      expect(defined("")).to.be.true
      expect(defined({})).to.be.true
      expect(defined([])).to.be.true
      expect(defined("undefined")).to.be.true
    })
  })

  describe("requireDefined()", () => {
    it("returns false", () => {
      expect(() => requireDefined(undefined)).to.throw(UndefinedError)
      expect(() => requireDefined(null)).to.throw(UndefinedError)
    })
    it("returns true", () => {
      expect(() => requireDefined(true)).not.to.throw()
      expect(() => requireDefined(false)).not.to.throw()
      expect(() => requireDefined(0)).not.to.throw()
      expect(() => requireDefined("")).not.to.throw()
      expect(() => requireDefined({})).not.to.throw()
      expect(() => requireDefined([])).not.to.throw()
      expect(() => requireDefined("undefined")).not.to.throw()
    })
  })

  describe("notDefined()", () => {
    it("returns true", () => {
      expect(notDefined(undefined)).to.be.true
      expect(notDefined(null)).to.be.true
    })
    it("returns false", () => {
      expect(notDefined(true)).to.be.false
      expect(notDefined(false)).to.be.false
      expect(notDefined(0)).to.be.false
      expect(notDefined("")).to.be.false
      expect(notDefined({})).to.be.false
      expect(notDefined([])).to.be.false
      expect(notDefined("undefined")).to.be.false
    })
  })

  describe("equals()", () => {
    it("returns true", () => {
      expect(equals(undefined, undefined)).to.be.true
      expect(equals(null, null)).to.be.true
      expect(equals(0, 0)).to.be.true
      expect(equals(1, 1)).to.be.true
      expect(equals("", "")).to.be.true
      expect(equals("t", "t")).to.be.true
      expect(equals({equals: () => true}, {})).to.be.true
    })
    it("returns false", () => {
      expect(equals(undefined, null)).to.be.false
      expect(equals({}, {})).to.be.false
      expect(equals([], [])).to.be.false
      expect(equals(0, "0")).to.be.false
      expect(equals({t: 1}, {t: 1})).to.be.false
      expect(equals({t: 1}, {t: 2})).to.be.false
      expect(equals([1], [1])).to.be.false
      expect(equals([1], [2])).to.be.false
    })
  })
  describe("isList()", () => {
    it("undefined returns false", () => {
      expect(isList(undefined)).to.be.false
    })
    it("array returns false", () => {
      expect(isList(["a"])).to.be.false
    })
    it("object returns false", () => {
      expect(isList({a: () => ({})})).to.be.false
    })
    it("sub returns true", () => {
      expect(isList({getInner: () => ({})})).to.be.false
      expect(isList(new DummyList())).to.be.true
    })
    it("other returns false", () => {
      expect(isList(1)).to.be.false
      expect(isList("")).to.be.false
      expect(isList("1")).to.be.false
    })
  })

  describe("abstractArrayToArray()", () => {
    it("returns inner if List", () => {
      // @ts-ignore
      const a = abstractArrayToArray(new DummyList())
      expect(a[0]).to.be.equals(5)
    })
    it("returns array if array", () => {
      const a = abstractArrayToArray([5])
      expect(a[0]).to.be.equals(5)
    })
    it("throws if not list or array", () => {
      expect(() => {
        // @ts-ignore
        abstractArrayToArray(6546)
      }).to.throw(InvalidArrayError)
    })
  })
})
