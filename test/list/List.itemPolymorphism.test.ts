import {List} from "../../src"
import {expect} from "chai"

abstract class ParentClass {
    value: number

    method() {
        return null
    }
}

class ChildClass1 extends ParentClass {
    yolo: number
}

class ChildClass2<T> extends ParentClass {
    vdf: T

    constructor(v: T) {
        super();
        this.vdf = v
    }
}

describe("List.itemPolymorphism", () => {
    describe("constructor()", () => {
        it("with undefined array create new array", () => {
            const list: List<ParentClass> = List.of(new ChildClass1(), new ChildClass2("v") as ParentClass)
            expect(list.size()).to.be.equals(2)
        })
    })
})
