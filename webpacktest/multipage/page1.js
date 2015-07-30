var $=require("jquery");
var _=require("underscore");
require("./cssnew.scss");
$("body").append("<p>hehehe</p>")
console.log(_.VERSION);
var mod1=require("./module1");
console.log(mod1.add(20,23))
