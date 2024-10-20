import {Promises} from "./Promises"
import "./index"
import "../../index.types"

const array = [1, 2, 6, 3, 6, 8]

describe("Promise", () => {
  describe("thenDo()", () => {
    it("returns correct data", done => {
      Promise.resolve(10)
        .thenDo(value => console.log(value))
        .thenDo(() => Promise.resolve(console.log("")))
        .thenDo(() => console.log("non"))
        .catch(e => e)
        .then(v => {
          console.log("res=", v)
          expect(v).toBe(10)
          done()
        })
    })
  })

  describe("onError()", () => {
    it("returns correct error", done => {
      Promise.reject(Error("err"))
        .onError(e => console.error(e))
        .catch(e => e)
        .then(v => {
          console.log("res=", v)
          expect(v.message).toBe("err")
          done()
        })
    })
  })
})

describe("Promises", () => {
  describe("sequence()", () => {
    it("correct", done => {
      const time = new Date().getTime()
      const array = [
        () => new Promise(resolve => {
          console.log("constructing 1", new Date().getTime() - time)
          setTimeout(() => {
            console.log("timeout 1", new Date().getTime() - time)
            resolve(new Date().getTime() - time);
          }, 100);
        }),
        () => new Promise(resolve => {
          console.log("constructing 2", new Date().getTime() - time)
          setTimeout(() => {
            console.log("timeout 2", new Date().getTime() - time)
            resolve(new Date().getTime() - time);
          }, 100);
        }),
        () => new Promise(resolve => {
          console.log("constructing 3", new Date().getTime() - time)
          setTimeout(() => {
            console.log("timeout 3", new Date().getTime() - time)
            resolve(new Date().getTime() - time);
          }, 100);
        }),
      ]
      Promises.sequence(array)
        .then(res => {
          expect(res).toBeGreaterThan(300)
          done()
        })

    })
  })

  describe("allSuccess()", () => {
    it("all success returns only data", done => {
      const promises = array.map(v => {
        return Promise.resolve(v)
      })
      Promises.allSuccess(promises)
        .then(res => {
          expect(res.getInner()).toBe(array)
          done()
        })
        .catch(err => {
          console.log(err)
          expect(true).toBeTruthy()
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
          expect(false).toBeTruthy()
        })
        .catch(err => {
          expect(err.size()).toBe(1)
          expect(err.first().get()).toBe("error3")
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
          expect(false).toBeTruthy()
        })
        .catch(err => {
          expect(err.size()).toBe(2)
          expect(err.first().get()).toBe("error6")
          done()
        })
    })
  })
})
