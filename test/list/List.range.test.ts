import {assert, expect} from "chai"
import {InvalidRangeEndError, InvalidRangeStartError, List} from "../../src"

describe("List.range", () => {
  it("with undefined as start throws", () => {
    assert.throw(() => List.range(undefined, undefined), InvalidRangeStartError)
  })

  it("with 0 as start does not throw", () => {
    assert.doesNotThrow(() => List.range(0, 10))
  })

  it("with undefined as end throws", () => {
    assert.throw(() => List.range(0, undefined), InvalidRangeEndError)
  })

  it("with end inferior to start throws", () => {
    assert.throw(() => List.range(1, 0), InvalidRangeEndError)
  })

  it("with start as end does not throw", () => {
    assert.doesNotThrow(() => List.range(0, 0))
  })

  it("with 0 as end does not throw", () => {
    assert.doesNotThrow(() => List.range(-1, 0))
  })

  it("0 length returns correct array length", () => {
    const length = 0
    const range = List.range(0, length)
    expect(range.collect().length).to.equals(length)
  })

  it("N length returns correct array length", () => {
    const length = 2
    const range = List.range(0, length)
    expect(range.collect().length).to.equals(length)
  })
})
