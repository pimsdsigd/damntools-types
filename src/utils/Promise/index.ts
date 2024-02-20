import {containsMethod} from "../../core";

Object.defineProperty(Promise.prototype, "thenDo", {
  value: function (onfulfilled?: ((value: any) => any | PromiseLike<any>) | undefined | null) {
    return this.then(v => {
      const res = onfulfilled(v)
      if (containsMethod(res, "then") && containsMethod(res, "catch"))
        return res.then(() => v)
      else
        return Promise.resolve(v)
    })
  },
  configurable: true
})
