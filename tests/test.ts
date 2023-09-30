import {Lists} from "./src"

abstract class Test {
  id: number
}

class YY extends Test {
  num: number
}

abstract class Sub extends Test {
  yolo() {
    return true
  }
}

class TT extends Sub {
  id = 6

  constructor() {
    super()
  }
}

Lists.of<Test>(new TT(), new YY()).stream().filterAbstract(Sub).log()
