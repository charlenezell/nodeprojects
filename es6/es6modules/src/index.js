var colorSym = Symbol();
export class Classname {
    constructor(color, zells = ["小明", "小红"], ...args) {
        // code
        this[colorSym] = color
        this._zells = zells
    }
    getColorZells() {
        return this.zells.map((v) => {
            let color = this.color
            let zell = v
            return `${color}:${zell}`;
        })
    }
    getColor() {
        return "#" + this[colorSym]
    }
    get zells() {
        return this._zells;
    }
    get color() {
        return "#" + this[colorSym];
    }

    static getSize(a, b) {
            return ~~a * ~~b;
        }
        // methods
}

export class ClassnameExtend extends Classname {
    constructor(...arg) {
        super(arg)
    }
    getColorZells() {
        return super.getColorZells().map((v) => v + "_sufixExtend");
    }
    get color() {
        return "##" + this[colorSym];
    }
}
function red (c) {
    return c;
}
var ccc=123,array=[123,4343,1323];
var [array1,array2,array3]=array;
var temp={
    a :function (){
        return this.b
    },
    b:888
}
export var testnewObjLiterals={
    red,
    toString(){
        return "always heheheh";
    },
    ["hehe"+ccc]:ccc,/*这个跟解构是否有什么联系*/
    array1,
    array2,
    array3,
    __proto__:temp
}
/*这种嵌套貌似不支持但是已经很不错了。。url,{isDebug,contentType,{password,name}},cb*/
export function getJSON(url,{password,name},{isDebug,contentType,method="post",it={a:1,b:2,c:{d:2}}},cb){
    var _cb=cb();
    return `i will sent to${url},with isDebug=${isDebug},contentType=${contentType}password:${password},name:${name} cbRst:${_cb} using ${method} method ${JSON.stringify(it)+'hehe'}`;
}

export var protoTest=temp
