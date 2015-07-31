require("../base/js/common.js");
require("../base/css/common.scss");
var navModule=require("../modules/nav/entry.js");
var $=require("jquery");
$(function(){
    console.log("helloworld2");
    new navModule.nav();
});
