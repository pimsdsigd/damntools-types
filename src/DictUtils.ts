import {ArrayList, List} from "./list"

export class DictUtils {
  static entries(obj: object): List<[string, any]> {
    return ArrayList.from(Object.entries(obj))
  }

  static fromEntries(entries: List<[string, any]>): object {
    return Object.fromEntries(entries.collect())
  }

  static keys(obj: object): List<string> {
    return ArrayList.from(Object.keys(obj))
  }

  static values(obj: object): List<any> {
    return ArrayList.from(Object.values(obj))
  }
}
