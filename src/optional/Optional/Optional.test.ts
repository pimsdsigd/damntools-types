import {Optional} from "./Optional"
import {expect} from "chai"
import {EmptyOptionalAccessError, UndefinedError} from "../../exceptions"

const PROVIDED = <T>(value: T) => Optional.of<T>(value)
const EMPTY = <T>() => Optional.empty<T>()

describe("Optional", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      // @ts-ignore
      const op = new Optional(undefined)
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.true
      expect(op._value).to.be.equals(undefined)
    })
    it("with null returns empty", () => {
      // @ts-ignore
      const op = new Optional(null)
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.true
      expect(op._value).to.be.equals(null)
    })
    it("with zero returns not empty", () => {
      // @ts-ignore
      const op = new Optional(0)
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.false
      expect(op._value).to.be.equals(0)
    })
    it("with false returns not empty", () => {
      // @ts-ignore
      const op = new Optional(false)
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.false
      expect(op._value).to.be.equals(false)
    })
  })

  describe("of()", () => {
    it("with undefined throws", () => {
      expect(() => Optional.of(undefined)).to.throw(UndefinedError)
      expect(() => Optional.of(null)).to.throw(UndefinedError)
    })

    it("with provided returns not empty", () => {
      // @ts-ignore
      const op = new Optional("efi")
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.false
      expect(op._value).to.be.equals("efi")
    })
  })

  describe("nullable()", () => {
    it("with undefined returns empty", () => {
      expect(Optional.nullable(undefined).isEmpty()).to.be.true
      expect(Optional.nullable(null).isEmpty()).to.be.true
    })

    it("with provided returns not empty", () => {
      const op = Optional.nullable(54)
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.false
      // @ts-ignore
      expect(op._value).to.be.equals(54)
    })
  })

  describe("empty()", () => {
    it("returns empty", () => {
      const op = Optional.empty()
      expect(op).not.to.be.undefined
      expect(op.isEmpty()).to.be.true
      // @ts-ignore
      expect(op._value).to.be.equals(undefined)
    })
  })

  describe("get()", () => {
    it("on empty throws", () => {
      expect(() => EMPTY().get()).to.throw(EmptyOptionalAccessError)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).get()).to.be.equals(1)
    })
  })

  describe("filter()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .filter(() => true)
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns if predicate is true", () => {
      expect(
        PROVIDED(1)
          .filter(() => true)
          .get()
      ).to.be.equals(1)
    })
    it("on not empty returns empty if predicate is false", () => {
      expect(
        PROVIDED(1)
          .filter(() => false)
          .isEmpty()
      ).to.be.true
    })
  })

  describe("filterClass()", () => {
    class SubError1 extends Error {
      r: string
    }

    class SubError2 extends Error {
      r: string
    }

    it("on empty returns empty", () => {
      expect(EMPTY<Error>().filterClass(SubError1).isEmpty()).to.be.true
    })
    it("on not empty returns if value is not correct type", () => {
      expect(Optional.of<Error>(new SubError1()).filterClass(SubError2).isEmpty()).to.be
        .true
    })
    it("on not empty returns empty if value is correct type", () => {
      expect(Optional.of<Error>(new SubError1()).filterClass(SubError1).isPresent()).to.be
        .true
    })
  })

  describe("map()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .map(a => a)
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns mapped when result is defined", () => {
      expect(
        PROVIDED(1)
          .map(a => a * 2)
          .get()
      ).to.be.equals(2)
      expect(
        PROVIDED(1)
          .map(() => 0)
          .get()
      ).to.be.equals(0)
    })
    it("on not empty returns empty when result is not defined", () => {
      expect(
        PROVIDED(1)
          .map(() => undefined)
          .isEmpty()
      ).to.be.true
      expect(
        PROVIDED(1)
          .map(() => null)
          .isEmpty()
      ).to.be.true
    })
  })

  describe("mapEmpty()", () => {
    it("on empty returns mapped when result is defined", () => {
      expect(
        EMPTY()
          .mapEmpty(() => 1)
          .get()
      ).to.be.equals(1)
    })
    it("on empty returns empty when result is not defined", () => {
      expect(
        EMPTY()
          .mapEmpty(() => undefined)
          .isEmpty()
      ).to.be.true
      expect(
        EMPTY()
          .mapEmpty(() => null)
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns mapped when result is defined", () => {
      expect(
        PROVIDED(1)
          .mapEmpty(() => 2)
          .get()
      ).to.be.equals(1)
      expect(
        PROVIDED(1)
          .mapEmpty(() => 0)
          .get()
      ).to.be.equals(1)
    })
    it("on not empty returns mapped when result is not defined", () => {
      expect(
        PROVIDED(1)
          .mapEmpty(() => undefined)
          .get()
      ).to.be.equals(1)
      expect(
        PROVIDED(1)
          .mapEmpty(() => null)
          .get()
      ).to.be.equals(1)
    })
  })

  describe("flatMap()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .flatMap(() => Optional.of(2))
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns empty if result is not defined", () => {
      expect(
        PROVIDED(1)
          .flatMap(() => undefined)
          .isEmpty()
      ).to.be.true
      expect(
        PROVIDED(1)
          .flatMap(() => null)
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns empty if result is not preset", () => {
      expect(
        PROVIDED(1)
          .flatMap(() => Optional.empty())
          .isEmpty()
      ).to.be.true
    })
    it("on not empty returns mapped", () => {
      expect(
        PROVIDED(1)
          .flatMap(a => Optional.of(a * 2))
          .get()
      ).to.be.equals(2)
    })
  })

  describe("orElseReturn()", () => {
    it("on empty returns other", () => {
      expect(EMPTY().orElseReturn(2)).to.be.equals(2)
      expect(EMPTY().orElseReturn(undefined)).to.be.equals(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseReturn(2)).to.be.equals(1)
    })
  })

  describe("orElseUndefined()", () => {
    it("on empty returns undefined", () => {
      expect(EMPTY().orElseUndefined()).to.be.equals(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseUndefined()).to.be.equals(1)
    })
  })

  describe("orElseGet()", () => {
    it("on empty returns supplied", () => {
      expect(EMPTY().orElseGet(() => 1)).to.be.equals(1)
      expect(EMPTY().orElseGet(() => undefined)).to.be.equals(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseGet(() => 2)).to.be.equals(1)
    })
  })

  describe("orElse()", () => {
    it("on empty returns empty if supplied is empty", () => {
      expect(
        EMPTY()
          .orElse(() => Optional.empty())
          .isEmpty()
      ).to.be.true
      expect(
        EMPTY()
          .orElse(() => undefined)
          .isEmpty()
      ).to.be.true
    })
    it("on empty returns supplied if supplied is not empty", () => {
      expect(
        EMPTY()
          .orElse(() => Optional.of(1))
          .get()
      ).to.be.equals(1)
    })
    it("on not empty returns value", () => {
      expect(
        PROVIDED(1)
          .orElse(() => Optional.of(2))
          .get()
      ).to.be.equals(1)
    })
  })

  describe("orElseThrow()", () => {
    it("on empty throws", () => {
      expect(() => EMPTY().orElseThrow(() => new Error())).to.throw(Error)
      expect(() => EMPTY().orElseThrow(() => undefined)).to.throw(
        EmptyOptionalAccessError
      )
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseThrow(() => new Error())).to.be.equals(1)
    })
  })

  describe("ifPresentDo()", () => {
    it("on empty do nothing", () => {
      let cpt = 0
      EMPTY().ifPresentDo(() => cpt++)
      expect(cpt).to.be.equals(0)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).ifPresentDo(() => cpt++)
      expect(cpt).to.be.equals(1)
    })
  })

  describe("ifPresentOrElse()", () => {
    it("on empty do else", () => {
      let cpt = 0
      EMPTY().ifPresentOrElse(
        () => (cpt = 1),
        () => (cpt = -1)
      )
      expect(cpt).to.be.equals(-1)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).ifPresentOrElse(
        () => (cpt = 1),
        () => (cpt = -1)
      )
      expect(cpt).to.be.equals(1)
    })
  })

  describe("peek()", () => {
    it("on empty do nothing", () => {
      let cpt = 0
      EMPTY().peek(() => cpt++)
      expect(cpt).to.be.equals(0)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).peek(() => cpt++)
      expect(cpt).to.be.equals(1)
    })
  })

  describe("equals()", () => {
    it("on empty and empty returns true", () => {
      expect(EMPTY().equals(EMPTY())).to.be.true
    })
    it("on empty and not empty returns false", () => {
      expect(EMPTY().equals(PROVIDED(1))).to.be.false
    })
    it("on not empty and empty returns false", () => {
      expect(PROVIDED(1).equals(EMPTY())).to.be.false
    })
    it("on not empty and not empty returns true when value equals", () => {
      expect(PROVIDED(1).equals(PROVIDED(1))).to.be.true
      expect(PROVIDED(0).equals(PROVIDED(0))).to.be.true
    })
    it("on not empty and not empty returns false when value not equals", () => {
      expect(PROVIDED(1).equals(PROVIDED(2))).to.be.false
      expect(PROVIDED(2).equals(PROVIDED(1))).to.be.false
      expect(PROVIDED("1").equals(PROVIDED(1))).to.be.false
      expect(PROVIDED(0).equals(PROVIDED("0"))).to.be.false
    })
  })

  describe("compare()", () => {
    it("on empty and empty returns 0", () => {
      expect(EMPTY().compare(EMPTY())).to.be.equals(0)
    })
    it("on empty and not empty returns -1", () => {
      expect(EMPTY().compare(PROVIDED(1))).to.be.equals(-1)
    })
    it("on not empty and empty returns 1", () => {
      expect(PROVIDED(1).compare(EMPTY())).to.be.equals(1)
    })
    it("on not empty and not empty returns 0 when value equals", () => {
      expect(PROVIDED(1).compare(PROVIDED(1))).to.be.equals(0)
      expect(PROVIDED(0).compare(PROVIDED(0))).to.be.equals(0)
      expect(PROVIDED("0").compare(PROVIDED("0"))).to.be.equals(0)
    })
    it("on not empty and not empty returns -1 when other is superior", () => {
      expect(PROVIDED(1).compare(PROVIDED(2))).to.be.equals(-1)
      expect(PROVIDED("a").compare(PROVIDED("b"))).to.be.equals(-1)
    })
    it("on not empty and not empty returns 1 when other is inferior", () => {
      expect(PROVIDED(2).compare(PROVIDED(1))).to.be.equals(1)
      expect(PROVIDED("b").compare(PROVIDED("a"))).to.be.equals(1)
    })
  })
})
