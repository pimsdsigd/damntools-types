import {Optional} from "./Optional"

describe("Optional", () => {
  describe("constructor()", () => {
    it("with undefined array create new array", () => {
      class Tee {
        te: string
      }
      const tees = new Tee()
      const test = process.argv[0] ? tees : undefined
      Optional.nullable(test).map(t => t.te)
    })
  })
})
