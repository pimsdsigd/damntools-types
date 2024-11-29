import "./index"
import "../../index.types"


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

  describe("log()", () => {
    it("returns correct error", done => {
      Promise.resolve("text")
        .log("prom")
        .then(v => {
          console.log("res=", v)
          expect(v).toBe("text")
          done()
        })
    })
  })

  describe("logDuration()", () => {
    it("with manual start", done => {
      const start = new Date().getTime()
      Promise.resolve("text")
        .then(r => new Promise(resolve => setTimeout(() => resolve(r), 200)))
        .logDuration(start, "prom")
        .then(v => {
          console.log("res=", v)
          expect(v).toBe("text")
          done()
        })
    })
  })
  describe("logTimer()", () => {
    it("with auto start", done => {
      Promise.resolve("text")
        .startTimer("prom")
        .then(r => new Promise(resolve => setTimeout(() => resolve(r), 200)))
        .logTimer("prom")
        .then(v => {
          console.log("res=", v)
          expect(v).toBe("text")
          done()
        })
    })
  })
  describe("zipWith()", () => {
    it("with auto start", done => {
      Promise.resolve("text")
        .zipWith(Promise.resolve("prom"))
        .zipWith(v => Promise.resolve(v[1].toUpperCase()))
        .then(v => {
          console.log("res=", v)
          expect(v[0][0]).toBe("text")
          expect(v[0][1]).toBe("prom")
          expect(v[1]).toBe("PROM")
          done()
        })
    })
  })
})
