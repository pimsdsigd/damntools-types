import {Optional} from "./Optional"
import {expect} from "chai"
import {EmptyOptionalAccessError, UndefinedError} from "../../exceptions"

const PROVIDED = Optional.of(1)
const EMPTY = Optional.empty()

describe("Optional", () => {
  describe("constructor()", () => {
    it("with undefined returns empty", () => {
      // @ts-ignore
      const op = new Optional(undefined)
      expect(op).not.to.be.undefined
      expect(op._empty).to.be.true
      expect(op._value).to.be.equals(undefined)
    })
    it("with null returns empty", () => {
      // @ts-ignore
      const op = new Optional(null)
      expect(op).not.to.be.undefined
      expect(op._empty).to.be.true
      expect(op._value).to.be.equals(null)
    })
    it("with zero returns not empty", () => {
      // @ts-ignore
      const op = new Optional(0)
      expect(op).not.to.be.undefined
      expect(op._empty).to.be.false
      expect(op._value).to.be.equals(0)
    })
    it("with false returns not empty", () => {
      // @ts-ignore
      const op = new Optional(false)
      expect(op).not.to.be.undefined
      expect(op._empty).to.be.false
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
      expect(op._empty).to.be.false
      expect(op._value).to.be.equals("efi")
    })
  })

  describe("nullable()", () => {
    it("with undefined returns empty", () => {
      // @ts-ignore
      expect(Optional.nullable(undefined)._empty).to.be.true
      // @ts-ignore
      expect(Optional.nullable(null)._empty).to.be.true
    })

    it("with provided returns not empty", () => {
      // @ts-ignore
      const op = Optional.nullable(54)
      expect(op).not.to.be.undefined
      // @ts-ignore
      expect(op._empty).to.be.false
      // @ts-ignore
      expect(op._value).to.be.equals(54)
    })
  })

  describe("empty()", () => {
    it("returns empty", () => {
      // @ts-ignore
      const op = Optional.empty()
      expect(op).not.to.be.undefined
      // @ts-ignore
      expect(op._empty).to.be.true
      // @ts-ignore
      expect(op._value).to.be.equals(undefined)
    })
  })

  describe("get()", () => {
    it("on empty throws", () => {
      expect(() => EMPTY.get()).to.throw(EmptyOptionalAccessError)
    })
    it("on not empty returns value", () => {
      expect(PROVIDED.get()).to.be.equals(1)
    })
  })
})
