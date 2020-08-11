//basic data types
interface myDataType {
    name:string,
    value:number
}

interface myInterface {
    variable:myDataType,
    number:number
}

let testObject:myInterface;

testObject = {
    variable:{
        name:"false",
        value:0
    },
    number:0
};
testObject.variable.name.split("s");
//Classes
class myClass {
    param:boolean;
    constructor(param1:boolean) {
        this.param = param1;
    };
    inverseParam() {
        this.param = !this.param;
    };
}


class complexNumber {
    realPart:number;
    imaginaryPart:number;
    constructor(rP:number, iP:number) {
        this.realPart = rP;
        this.imaginaryPart = iP;
    };
    print() {
        console.log(this.realPart + " + " + this.imaginaryPart + "*i");
    };
    modulo() {
        return (this.realPart*2 + this.imaginaryPart*2);
    }
}

let nr = new complexNumber(2,2);
nr.print();
console.log(nr.modulo());


//Inheritance

class complexNumberPlus extends complexNumber {
    newNumberPlus:number;
    constructor(rP:number, iP:number, nNP:number) {
        super(rP,iP);
        this.newNumberPlus = nNP;
    };
    newNumberCalculator() {
        return this.imaginaryPart + this.newNumberPlus + this.realPart;
    }
}

let nrPlus = new complexNumberPlus(3,3,4);

nrPlus.print();
console.log(nrPlus.newNumberCalculator());


//Interface and implements


interface test {
    getTest():number,
    result:number,
    optionalParameter?:string,
    readonly rdparam:number,
    [key:string]:any,
}

let variable:test ={
    getTest():number {
        return this.result;
    },
    result:0,
    rdparam:0,
    "key1":12,
    "key2":false,
    "key3":({
        
    } as test),
    "key4":"value4",

}
console.log(variable);

let variable1:test ={
    getTest():number {
        return this.result;
    },
    result:1,
    rdparam:0,
    "key1":12,
    "key2":false,
}
console.log(variable1);



class testClass implements test {
    result: number;
    rdparam:number;
    constructor() {
        this.result = 0;
        this.rdparam = 12;
    };
    getTest():number {
        return this.result;
    }
}

let testVar:test = new testClass();
testVar.result = 12;
let testVar1:test = new testClass();
let testVar2:test = new testClass();
