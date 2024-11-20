import {ReferenceAccessor} from "./ReferenceAccessor"

type Ref = {
  a: number
}

describe("ReferenceAccessor", () => {
  describe("compareAndSet()", () => {
    it("should return false if field is not set", () => {
      const obj = {}
      const ref = new ReferenceAccessor<Ref, number>("a")
      const res = ref.compareAndSet(obj as Ref, 5, 5)
      expect(res).toBeFalsy()
      expect(obj["a"]).toBeUndefined()
    })
    it("should return false and not change field if do not match expected", () => {
      const obj = {
        a: 5
      }
      const ref = new ReferenceAccessor<{a: number}, number>("a")
      const res = ref.compareAndSet(obj, null, 10)
      expect(res).toBeFalsy()
      expect(obj.a).toBe(5)
    })
    it("should return true if field undefined and undefined is expected ", () => {
      const obj = {
        a: undefined
      }
      const ref = new ReferenceAccessor<{a: number}, number>("a")
      const res = ref.compareAndSet(obj, undefined, 10)
      expect(res).toBeTruthy()
      expect(obj.a).toBe(10)
    })
    it("should return true if field null and null is expected ", () => {
      const obj = {
        a: null
      }
      const ref = new ReferenceAccessor<{a: number}, number>("a")
      const res = ref.compareAndSet(obj, null, 10)
      expect(res).toBeTruthy()
      expect(obj.a).toBe(10)
    })
    it("should return false if field undefined and null is expected ", () => {
      const obj = {
        a: undefined
      }
      const ref = new ReferenceAccessor<{a: number}, number>("a")
      const res = ref.compareAndSet(obj, null, 10)
      expect(res).toBeFalsy()
      expect(obj.a).toBeUndefined()
    })
    it("should return true and set value ", () => {
      const obj = {
        a: 5
      }
      const ref = new ReferenceAccessor<{a: number}, number>("a")
      const res = ref.compareAndSet(obj, 5, 10)
      expect(res).toBeTruthy()
      expect(obj.a).toBe(10)
    })
  })
})
