import {assert} from "chai"
import {List} from "../../src/list/List";
import {InvalidRangeStartError} from "../../src/exceptions";

describe("List", () => {
	describe("List.range", () => {
		it("with undefined as start throws", () => {
			assert.throw(() => List.range(undefined, undefined), InvalidRangeStartError)
		})
	})
})
