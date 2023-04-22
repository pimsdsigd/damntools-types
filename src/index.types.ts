import {List} from "./list";

export * from "./exceptions"
export * from "./Collectable"
export * from "./list"

declare global {
  interface Array<T> {
    toList(): List<T>;
  }

}
