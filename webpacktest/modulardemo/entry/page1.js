require("../base/js/common.js");
require("../base/css/common.scss");
var navModule=require("../modules/nav/entry.js");
var footModule=require("../modules/foot/entry.js");
var $=require("jquery");
$(function(){
    console.log("helloworld");
    new navModule.nav();
    new footModule.foot();
});
