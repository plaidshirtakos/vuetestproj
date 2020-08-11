"use strict";
let testObject;
testObject = {
    variable: {
        name: "false",
        value: 0
    },
    number: 0
};
testObject.variable.name.split("s");
//Classes
class myClass {
    constructor(param1) {
        this.param = param1;
    }
    ;
    inverseParam() {
        this.param = !this.param;
    }
    ;
}
class complexNumber {
    constructor(rP, iP) {
        this.realPart = rP;
        this.imaginaryPart = iP;
    }
    ;
    print() {
        console.log(this.realPart + " + " + this.imaginaryPart + "*i");
    }
    ;
    modulo() {
        return (this.realPart * 2 + this.imaginaryPart * 2);
    }
}
let nr = new complexNumber(2, 2);
nr.print();
console.log(nr.modulo());
//Inheritance
class complexNumberPlus extends complexNumber {
    constructor(rP, iP, nNP) {
        super(rP, iP);
        this.newNumberPlus = nNP;
    }
    ;
    newNumberCalculator() {
        return this.imaginaryPart + this.newNumberPlus + this.realPart;
    }
}
let nrPlus = new complexNumberPlus(3, 3, 4);
nrPlus.print();
console.log(nrPlus.newNumberCalculator());
let variable = {
    getTest() {
        return this.result;
    },
    result: 0,
    rdparam: 0,
    "key1": 12,
    "key2": false,
    "key3": {},
    "key4": "value4",
};
console.log(variable);
let variable1 = {
    getTest() {
        return this.result;
    },
    result: 1,
    rdparam: 0,
    "key1": 12,
    "key2": false,
};
console.log(variable1);
class testClass {
    constructor() {
        this.result = 0;
        this.rdparam = 12;
    }
    ;
    getTest() {
        return this.result;
    }
}
let testVar = new testClass();
testVar.result = 12;
let testVar1 = new testClass();
let testVar2 = new testClass();
