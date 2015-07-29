define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _testnewObjLiterals;

    var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    exports.getJSON = getJSON;

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var colorSym = Symbol();

    var Classname = (function () {
        function Classname(color) {
            var zells = arguments.length <= 1 || arguments[1] === undefined ? ["小明", "小红"] : arguments[1];

            _classCallCheck(this, Classname);

            // code
            this[colorSym] = color;
            this._zells = zells;
        }

        _createClass(Classname, [{
            key: "getColorZells",
            value: function getColorZells() {
                var _this = this;

                return this.zells.map(function (v) {
                    var color = _this.color;
                    var zell = v;
                    return color + ":" + zell;
                });
            }
        }, {
            key: "getColor",
            value: function getColor() {
                return "#" + this[colorSym];
            }
        }, {
            key: "zells",
            get: function get() {
                return this._zells;
            }
        }, {
            key: "color",
            get: function get() {
                return "#" + this[colorSym];
            }
        }], [{
            key: "getSize",
            value: function getSize(a, b) {
                return ~ ~a * ~ ~b;
            }

            // methods
        }]);

        return Classname;
    })();

    exports.Classname = Classname;

    var ClassnameExtend = (function (_Classname) {
        _inherits(ClassnameExtend, _Classname);

        function ClassnameExtend() {
            _classCallCheck(this, ClassnameExtend);

            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            _get(Object.getPrototypeOf(ClassnameExtend.prototype), "constructor", this).call(this, arg);
        }

        _createClass(ClassnameExtend, [{
            key: "getColorZells",
            value: function getColorZells() {
                return _get(Object.getPrototypeOf(ClassnameExtend.prototype), "getColorZells", this).call(this).map(function (v) {
                    return v + "_sufixExtend";
                });
            }
        }, {
            key: "color",
            get: function get() {
                return "##" + this[colorSym];
            }
        }]);

        return ClassnameExtend;
    })(Classname);

    exports.ClassnameExtend = ClassnameExtend;

    function red(c) {
        return c;
    }
    var ccc = 123,
        array = [123, 4343, 1323];
    var array1 = array[0];
    var array2 = array[1];
    var array3 = array[2];

    var temp = {
        a: function a() {
            return this.b;
        },
        b: 888
    };
    var testnewObjLiterals = (_testnewObjLiterals = {
        red: red,
        toString: function toString() {
            return "always heheheh";
        },

        __proto__: temp
    }, _defineProperty(_testnewObjLiterals, "hehe" + ccc, ccc), _defineProperty(_testnewObjLiterals, "array1", /*这个跟解构是否有什么联系*/
    array1), _defineProperty(_testnewObjLiterals, "array2", array2), _defineProperty(_testnewObjLiterals, "array3", array3), _testnewObjLiterals);
    /*这种嵌套貌似不支持但是已经很不错了。。url,{isDebug,contentType,{password,name}},cb*/
    exports.testnewObjLiterals = testnewObjLiterals;

    function getJSON(url, _ref, _ref2, cb) {
        var password = _ref.password;
        var name = _ref.name;
        var isDebug = _ref2.isDebug;
        var contentType = _ref2.contentType;
        var _ref2$method = _ref2.method;
        var method = _ref2$method === undefined ? "post" : _ref2$method;
        var _ref2$it = _ref2.it;
        var it = _ref2$it === undefined ? { a: 1, b: 2, c: { d: 2 } } : _ref2$it;

        var _cb = cb();
        return "i will sent to" + url + ",with isDebug=" + isDebug + ",contentType=" + contentType + "password:" + password + ",name:" + name + " cbRst:" + _cb + " using " + method + " method " + (JSON.stringify(it) + 'hehe');
    }

    var protoTest = temp;
    exports.protoTest = protoTest;
});
//# sourceMappingURL=index.js.map