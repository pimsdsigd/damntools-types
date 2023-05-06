import {ArrayList, List} from "./list"
import {Dict, DictKeyType, DictObjectEntry, fromEntriesFn, KV} from "./dict"

export class DictUtils {
  static entries(obj: object): List<[string, any]> {
    return ArrayList.from(Object.entries(obj))
  }

  static fromEntries<K extends DictKeyType, V>(
    entries: List<DictObjectEntry<K, V>>
  ): Dict<K, V> {
    return fromEntriesFn(entries)
  }

  static fromObjectEntries<K extends DictKeyType, V>(
    entries: List<[string, any]>
  ): Dict<K, V> {
    return KV.from(Object.fromEntries(entries.getInner()) as any)
  }

  static keys(obj: object): List<string> {
    return ArrayList.from(Object.keys(obj))
  }

  static values(obj: object): List<any> {
    return ArrayList.from(Object.values(obj))
  }
}
