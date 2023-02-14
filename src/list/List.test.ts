import {assert} from "chai"
import {List} from "./List";
import {InvalidRangeStartError} from "../exceptions";

describe("List", () => {
	describe("List.range", () => {
		it("with undefined as start throws", () => {
			assert.throw(() => List.range(undefined, undefined), InvalidRangeStartError)
		})
	})
})
