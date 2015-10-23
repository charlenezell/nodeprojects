define(['require', 'exports', 'module'],function(require, exports, module){
  exports.sayHello=function(){
    alert("hello");
  }
  exports.commonInit=function(){
    require(["sidebar"], function(sidebar) {
      sidebar.init();
    });
  }
});
