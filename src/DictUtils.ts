import {Lists} from "./utils"
import {fromEntriesFn, KV} from "./dict"
import {Dict, DictObjectEntry, List} from "./core"

export class DictUtils {
  static entries(obj: object): List<[string, any]> {
    return Lists.from(Object.entries(obj))
  }

  static fromEntries<V>(entries: List<DictObjectEntry<V>>): Dict<V> {
    return fromEntriesFn(entries)
  }

  static fromObjectEntries<V>(entries: List<[string, any]>): Dict<V> {
    return KV.from(Object.fromEntries(entries.getInner()) as any)
  }

  static keys(obj: object): List<string> {
    return Lists.from(Object.keys(obj))
  }

  static values(obj: object): List<any> {
    return Lists.from(Object.values(obj))
  }
}
