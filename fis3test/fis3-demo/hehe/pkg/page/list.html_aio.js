/*!component/sidebar/index.js*/
;define("component/sidebar/index",["require","exports","module"],function(e,n){n.hehe=function(){console.log("hehe imSidebar")}});
/*!component/nav/index.js*/
;define("component/nav/index",["require","exports","module","component/sidebar/index"],function(e,n){var o=e("component/sidebar/index");n.showNav=function(){console.log("showNav")},n.showSideBarNav=function(){o.hehe()}});
/*!page/list.js*/
;require(["component/nav/index"],function(n){n.showNav(),n.showSideBarNav()});