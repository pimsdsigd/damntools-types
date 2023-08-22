import {Promises} from "./Promises"
import {expect} from "chai"

const array = [1, 2, 6, 3, 6, 8]

describe("Promises", () => {
  describe("allSuccess()", () => {
    it("all success returns only data", done => {
      const promises = array.map(v => {
        return Promise.resolve(v)
      })
      Promises.allSuccess(promises)
        .then(res => {
          expect(res.getInner()).to.be.eql(array)
          done()
        })
        .catch(err => {
          console.log(err)
          expect(false).to.be.true
          done()
        })
    })
    it("one ko throws 1 error", done => {
      const promises = array.map(v => {
        if (v === 3) return Promise.reject("error" + v)
        return Promise.resolve(v)
      })
      Promises.allSuccess(promises)
        .then(() => {
          expect(false).to.be.true
        })
        .catch(err => {
          expect(err.size()).to.be.eq(1)
          expect(err.first().get()).to.be.eq("error3")
          done()
        })
    })
    it("two ko throws 2 error", done => {
      const promises = array.map(v => {
        if (v === 6) return Promise.reject("error" + v)
        return Promise.resolve(v)
      })
      Promises.allSuccess(promises)
        .then(() => {
          expect(false).to.be.true
        })
        .catch(err => {
          expect(err.size()).to.be.eq(2)
          expect(err.first().get()).to.be.eq("error6")
          done()
        })
    })
  })
})
