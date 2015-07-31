var $=require("jquery");
var _=require("underscore");
require("./css.scss");
require("./cssnew.scss");
$(function(){
    $("body").append("<p>hehehe</p>")
    $("body").append("<p>"+_.VERSION+"</p>");
    var mod1=require("./module1");
    $("body").append("<p>"+mod1.add(20,23)+"</p>");
    var mod2=require("./module2.es6")
    var w=new mod2.Hello("xiaohong");
    console.log(w.say())
});

