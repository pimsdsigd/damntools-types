import {containsMethod} from "../../core"

const TIMERS = {}

Object.defineProperty(Promise.prototype, "thenDo", {
  value: function (
    onfulfilled?: ((value: any) => any | PromiseLike<any>) | undefined | null
  ) {
    return this.then(v => {
      const res = onfulfilled(v)
      if (containsMethod(res, "then") && containsMethod(res, "catch"))
        return res.then(() => v)
      else return Promise.resolve(v)
    })
  },
  configurable: true
})

Object.defineProperty(Promise.prototype, "onError", {
  value: function (
    onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null
  ) {
    return this.catch(err => {
      try {
        onrejected(err)
      } catch {
        // NOTHING
      }
      return Promise.reject(err)
    })
  },
  configurable: true
})

Object.defineProperty(Promise.prototype, "log", {
  value: function (name?: string
  ) {
    return this.then(v => {
      console.debug(`Promise."${name || "log"}"`, v)
      return Promise.resolve(v)
    })
  },
  configurable: true
})

Object.defineProperty(Promise.prototype, "startTimer", {
  value: function (name?: string
  ) {
    return this.then(v => {
      TIMERS[name || "def"] = new Date().getTime()
      return Promise.resolve(v)
    })
  },
  configurable: true
})

Object.defineProperty(Promise.prototype, "logDuration", {
  value: function (
    startTime: number,
    name?: string
  ) {
    return this.then(v => {
      console.debug(`Promise."${name || "timer"}" : took ${new Date().getTime() - startTime}ms`, v)
      return Promise.resolve(v)
    })
  },
  configurable: true
})

Object.defineProperty(Promise.prototype, "logTimer", {
  value: function (
    name?: string
  ) {
    return this.then(v => {
      if (TIMERS[name || "def"]) {
        console.debug(`Promise."${name || "timer"}" : took ${new Date().getTime() - TIMERS[name || "def"]}ms`, v)
        return Promise.resolve(v)
      }
      return Promise.resolve(v)
    })
  },
  configurable: true
})


export * from "./Promises"
