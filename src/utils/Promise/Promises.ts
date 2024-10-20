import {AbstractedArray, isList, List} from "../../core"
import {ArrayList} from "../../list"

export type FulfilledPromise<T> = {
  status: "fulfilled"
  value: T
}

export type RejectedPromise = {
  status: "rejected"
  reason: any
}

export type PromiseResult<T> = FulfilledPromise<T> | RejectedPromise

export type PromiseSettlementOptions = {
  throwFirst?: boolean
  throwAll?: boolean
  throwLast?: boolean
}

const isFulfilled = <T>(result: PromiseResult<T>): result is FulfilledPromise<T> => {
  return result.status === "fulfilled"
}

export class Promises {
  static allSettled<T>(
    promises: AbstractedArray<Promise<T>>
  ): Promise<List<PromiseResult<T>>> {
    const p = isList(promises) ? promises.getInner() : promises
    return Promise.allSettled(p).then(res => {
      return new ArrayList(
        res.map<PromiseResult<T>>(r => {
          if (r.status === "fulfilled") {
            return {
              ...r
            }
          } else {
            return {
              ...r
            }
          }
        })
      )
    })
  }

  static allSuccess<T>(
    promises: AbstractedArray<Promise<T>>,
    options?: PromiseSettlementOptions
  ): Promise<List<T>> {
    const p = isList(promises) ? promises.getInner() : promises
    return Promises.allSettled(p).then(res => {
      const ok = new ArrayList<T>()
      const ko = new ArrayList<any>()
      res.forEach(r => {
        if (isFulfilled(r)) ok.push(r.value)
        else return ko.push(r.reason)
      })
      console.log("hey")
      if (ok.size() === p.length) {
        return ok
      } else if (options?.throwFirst) {
        throw ko.first().get()
      } else if (options?.throwLast) {
        throw ko.last().get()
      } else {
        throw ko
      }
    })
  }

  static sequence(
    promises: AbstractedArray<() => Promise<any>>): Promise<any> {
    const p = isList(promises) ? promises.getInner() : promises
    return p.reduce((previousValue, currentValue) => previousValue.then(() => currentValue()), Promise.resolve())
  }
}
