import {assert, expect} from "chai"
import {InvalidArrayError, InvalidRangeEndError, InvalidRangeStartError, List} from "../../src";

describe("List", () => {
	describe("List.constructor()", () => {
		it("with undefined array create new array", () => {
			expect(new List().collect().length).to.equals(0)
		})

		it("with invalid array throws", () => {
			assert.throw(() => new List(5), InvalidArrayError)
			assert.throw(() => new List(true), InvalidArrayError)
			assert.throw(() => new List({}), InvalidArrayError)
		})

		it("with empty array returns empty array", () => {
			expect(new List([]).collect().length).to.equals(0)
		})

		it("with array returns array", () => {
			const list = new List([65])
			expect(list.collect().length).to.equals(1)
			expect(list.get(0)).to.equals(65)
		})
	})

	describe("List.from", () => {
		it("with undefined array throws", () => {
			assert.throw(() => List.from(undefined), InvalidArrayError)
		})

		it("with empty array returns empty array", () => {
			expect(List.from([]).collect().length).to.equals(0)
		})

		it("with array returns array", () => {
			const list = List.from([65])
			expect(list.collect().length).to.equals(1)
			expect(list.get(0)).to.equals(65)
		})
	})

	describe("List.of", () => {
		it("with 0 item returns empty", () => {
			expect(List.of().collect().length).to.equals(0)
		})

		it("with 1 item returns correct array", () => {
			const list = List.of(65)
			expect(list.collect().length).to.equals(1)
			expect(list.get(0)).to.equals(65)
		})

		it("with N>1 item returns correct array", () => {
			const list = List.of(65,66)
			expect(list.collect().length).to.equals(2)
			expect(list.get(0)).to.equals(65)
			expect(list.get(1)).to.equals(66)
		})

		it("with one item array returns correct array of array", () => {
			const list = List.of([65])
			expect(list.collect().length).to.equals(1)
			expect(list.get(0).length).to.equals(1)
			expect(list.get(0)[0]).to.equals(65)
		})

	})
})
