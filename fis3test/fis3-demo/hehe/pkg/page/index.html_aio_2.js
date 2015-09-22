/*!component/player/index.js*/
;define("component/player/index",["require","exports","module","components/jquery/jquery"],function(e){var o=e("components/jquery/jquery");console.log("fromPlayer"),o("body").css({color:"red"})});
/*!page/index.js*/
;require(["component/nav/index"],function(n){n.showNav(),n.showSideBarNav()}),require(["component/player/index"],function(n){console.log(n)});