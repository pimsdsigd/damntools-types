import {fromEntriesFn, KV} from "../dict"
import {Dict, DictKeyType, DictObjectEntry, List} from "../core"
import {StaticArrayList} from "../list"

export class DictUtils {
  static entries(obj: object): List<[string, any]> {
    return new StaticArrayList(Object.entries(obj))
  }

  static fromEntries<K extends DictKeyType, V>(
    entries: List<DictObjectEntry<K, V>>
  ): Dict<K, V> {
    return fromEntriesFn(entries)
  }

  static fromObjectEntries<V>(entries: List<[string, any]>): Dict<string, V> {
    return KV.from(Object.fromEntries(entries.getInner()) as any)
  }

  static keys(obj: object): List<string> {
    return new StaticArrayList(Object.keys(obj))
  }

  static values(obj: object): List<any> {
    return new StaticArrayList(Object.values(obj))
  }
}
