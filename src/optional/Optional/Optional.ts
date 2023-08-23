import {Optionable} from "../../core"
import {ValueOptional} from "./ValueOptional"
import {EmptyOptional} from "./EmptyOptional"
import {UndefinedError} from "../../exceptions"

export class Optional {
  public static EMPTY = new EmptyOptional<any>(undefined)

  static of<U>(value: U): Optionable<U> {
    if (!!value || value === 0 || value === false || value === "")
      return new ValueOptional<U>(value)
    throw new UndefinedError("Value should be defined when using of()")
  }

  static empty<U>(): Optionable<U> {
    return Optional.EMPTY as Optionable<U>
  }

  static nullable<U>(value: U | undefined | null): Optionable<U> {
    return !!value || value === 0 || value === false || value === ""
      ? new ValueOptional<U>(value)
      : Optional.empty()
  }

  static fromString(value: string | "" | undefined | null): Optionable<string> {
    return (value && value.length) > 0
      ? new ValueOptional<string>(value)
      : Optional.empty()
  }

  static isOptional<T>(obj: Optionable<T> | any): obj is Optionable<T>{
    return obj instanceof ValueOptional || obj instanceof  EmptyOptional
  }
}

export const isOptional = Optional.isOptional

