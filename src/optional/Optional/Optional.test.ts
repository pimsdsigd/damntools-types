import {EmptyOptional, Optional, ValueOptional} from "./Optional"
import {EmptyOptionalAccessError, UndefinedError} from "../../exceptions"
import {Optionable} from "../../core";

const PROVIDED = <T>(value: T) => Optional.of<T>(value)
const EMPTY = <T>() => Optional.empty<T>()

describe("Optional", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      const op = new EmptyOptional(undefined)
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBeTruthy()
      // @ts-expect-error
      expect(op._value).toBe(undefined)
    })
    it("with null returns empty", () => {
      const op = new EmptyOptional(null)
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBeTruthy()
      // @ts-expect-error
      expect(op._value).toBe(null)
    })
    it("with zero returns not empty", () => {
      const op = new ValueOptional(0)
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBe(false)
      // @ts-expect-error
      expect(op._value).toBe(0)
    })
    it("with false returns not empty", () => {
      const op = new ValueOptional(false)
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBe(false)
      // @ts-expect-error
      expect(op._value).toBe(false)
    })
  })

  describe("of()", () => {
    it("with undefined throws", () => {
      expect(() => Optional.of(undefined)).toThrow(UndefinedError)
      expect(() => Optional.of(null)).toThrow(UndefinedError)
    })

    it("with provided returns not empty", () => {
      const op = new ValueOptional("efi")
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBe(false)
      // @ts-expect-error
      expect(op._value).toBe("efi")
    })
  })

  describe("nullable()", () => {
    it("with undefined returns empty", () => {
      expect(Optional.nullable(undefined).isEmpty()).toBeTruthy()
      expect(Optional.nullable(null).isEmpty()).toBeTruthy()
    })

    it("with provided returns not empty", () => {
      const op = Optional.nullable(54)
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBe(false)
      // @ts-expect-error
      expect(op._value).toBe(54)
    })
  })

  describe("empty()", () => {
    it("returns empty", () => {
      const op = Optional.empty()
      expect(op).toBeDefined()
      expect(op.isEmpty()).toBeTruthy()
      // @ts-expect-error
      expect(op._value).toBe(undefined)
    })
  })

  describe("get()", () => {
    it("on empty throws", () => {
      expect(() => EMPTY().get()).toThrow(EmptyOptionalAccessError)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).get()).toBe(1)
    })
  })

  describe("filter()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .filter(() => true)
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns if predicate is true", () => {
      expect(
        PROVIDED(1)
          .filter(() => true)
          .get()
      ).toBe(1)
    })
    it("on not empty returns empty if predicate is false", () => {
      expect(
        PROVIDED(1)
          .filter(() => false)
          .isEmpty()
      ).toBeTruthy()
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
      expect(EMPTY<Error>().filterClass(SubError1).isEmpty()).toBeTruthy()
    })
    it("on not empty returns if value is not correct type", () => {
      expect(Optional.of<Error>(new SubError1()).filterClass(SubError2).isEmpty()).toBe(
        true
      )
    })
    it("on not empty returns empty if value is correct type", () => {
      expect(Optional.of<Error>(new SubError1()).filterClass(SubError1).isPresent()).toBe(
        true
      )
    })
  })

  describe("map()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .map(a => a)
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns mapped when result is defined", () => {
      expect(
        PROVIDED(1)
          .map(a => a * 2)
          .get()
      ).toBe(2)
      expect(
        PROVIDED(1)
          .map(() => 0)
          .get()
      ).toBe(0)
    })
    it("on not empty returns empty when result is not defined", () => {
      expect(
        PROVIDED(1)
          .map(() => undefined)
          .isEmpty()
      ).toBeTruthy()
      expect(
        PROVIDED(1)
          .map(() => null)
          .isEmpty()
      ).toBeTruthy()
    })
    it("map null should remove undefined from type", () => {
      let opt : Optionable<string> = Optional.empty()
      const value : string | undefined = undefined
      opt = Optional.of(5).map(() => value)
      expect(opt.isEmpty()).toBeTruthy()

    })
  })

  describe("mapEmpty()", () => {
    it("on empty returns mapped when result is defined", () => {
      expect(
        EMPTY()
          .mapEmpty(() => 1)
          .get()
      ).toBe(1)
    })
    it("on empty returns empty when result is not defined", () => {
      expect(
        EMPTY()
          .mapEmpty(() => undefined)
          .isEmpty()
      ).toBeTruthy()
      expect(
        EMPTY()
          .mapEmpty(() => null)
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns mapped when result is defined", () => {
      expect(
        PROVIDED(1)
          .mapEmpty(() => 2)
          .get()
      ).toBe(1)
      expect(
        PROVIDED(1)
          .mapEmpty(() => 0)
          .get()
      ).toBe(1)
    })
    it("on not empty returns mapped when result is not defined", () => {
      expect(
        PROVIDED(1)
          .mapEmpty(() => undefined)
          .get()
      ).toBe(1)
      expect(
        PROVIDED(1)
          .mapEmpty(() => null)
          .get()
      ).toBe(1)
    })
  })

  describe("flatMap()", () => {
    it("on empty returns empty", () => {
      expect(
        EMPTY()
          .flatMap(() => Optional.of(2))
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns empty if result is not defined", () => {
      expect(
        PROVIDED(1)
          .flatMap(() => undefined)
          .isEmpty()
      ).toBeTruthy()
      expect(
        PROVIDED(1)
          .flatMap(() => null)
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns empty if result is not preset", () => {
      expect(
        PROVIDED(1)
          .flatMap(() => Optional.empty())
          .isEmpty()
      ).toBeTruthy()
    })
    it("on not empty returns mapped", () => {
      expect(
        PROVIDED(1)
          .flatMap(a => Optional.of(a * 2))
          .get()
      ).toBe(2)
    })
  })

  describe("orElseReturn()", () => {
    it("on empty returns other", () => {
      expect(EMPTY().orElseReturn(2)).toBe(2)
      expect(EMPTY().orElseReturn(undefined)).toBe(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseReturn(2)).toBe(1)
    })
  })

  describe("orElseUndefined()", () => {
    it("on empty returns undefined", () => {
      expect(EMPTY().orElseUndefined()).toBe(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseUndefined()).toBe(1)
    })
  })

  describe("orElseGet()", () => {
    it("on empty returns supplied", () => {
      expect(EMPTY().orElseGet(() => 1)).toBe(1)
      expect(EMPTY().orElseGet(() => undefined)).toBe(undefined)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseGet(() => 2)).toBe(1)
    })
  })

  describe("orElse()", () => {
    it("on empty returns empty if supplied is empty", () => {
      expect(
        EMPTY()
          .orElse(() => Optional.empty())
          .isEmpty()
      ).toBeTruthy()
      expect(
        EMPTY()
          .orElse(() => undefined)
          .isEmpty()
      ).toBeTruthy()
    })
    it("on empty returns supplied if supplied is not empty", () => {
      expect(
        EMPTY()
          .orElse(() => Optional.of(1))
          .get()
      ).toBe(1)
    })
    it("on not empty returns value", () => {
      expect(
        PROVIDED(1)
          .orElse(() => Optional.of(2))
          .get()
      ).toBe(1)
    })
  })

  describe("orElseThrow()", () => {
    it("on empty throws", () => {
      expect(() => EMPTY().orElseThrow(() => new Error())).toThrow(Error)
      expect(() => EMPTY().orElseThrow(() => undefined)).toThrow(EmptyOptionalAccessError)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED(1).orElseThrow(() => new Error())).toBe(1)
    })
  })

  describe("ifPresentDo()", () => {
    it("on empty do nothing", () => {
      let cpt = 0
      EMPTY().ifPresentDo(() => cpt++)
      expect(cpt).toBe(0)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).ifPresentDo(() => cpt++)
      expect(cpt).toBe(1)
    })
  })

  describe("ifPresentOrElse()", () => {
    it("on empty do else", () => {
      let cpt = 0
      EMPTY().ifPresentOrElse(
        () => (cpt = 1),
        () => (cpt = -1)
      )
      expect(cpt).toBe(-1)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).ifPresentOrElse(
        () => (cpt = 1),
        () => (cpt = -1)
      )
      expect(cpt).toBe(1)
    })
  })

  describe("peek()", () => {
    it("on empty do nothing", () => {
      let cpt = 0
      EMPTY().peek(() => cpt++)
      expect(cpt).toBe(0)
    })
    it("on not empty do action", () => {
      let cpt = 0
      PROVIDED(1).peek(() => cpt++)
      expect(cpt).toBe(1)
    })
  })

  describe("equals()", () => {
    it("on empty and empty returns true", () => {
      expect(EMPTY().equals(EMPTY())).toBeTruthy()
    })
    it("on empty and not empty returns false", () => {
      expect(EMPTY().equals(PROVIDED(1))).toBe(false)
    })
    it("on not empty and empty returns false", () => {
      expect(PROVIDED(1).equals(EMPTY())).toBe(false)
    })
    it("on not empty and not empty returns true when value equals", () => {
      expect(PROVIDED(1).equals(PROVIDED(1))).toBeTruthy()
      expect(PROVIDED(0).equals(PROVIDED(0))).toBeTruthy()
    })
    it("on not empty and not empty returns false when value not equals", () => {
      expect(PROVIDED(1).equals(PROVIDED(2))).toBe(false)
      expect(PROVIDED(2).equals(PROVIDED(1))).toBe(false)
      expect(PROVIDED("1").equals(PROVIDED(1))).toBe(false)
      expect(PROVIDED(0).equals(PROVIDED("0"))).toBe(false)
    })
  })
})
