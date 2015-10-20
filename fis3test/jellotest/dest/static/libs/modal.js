define('static/libs/modal', ['require', 'exports', 'module', 'components/bootstrap/bootstrap', 'components/jquery/jquery'], function(require, exports, module) {

  /**
   * 标记 css 依赖, 需要用到 loading 图标。
   * @require components/font-awesome/css/font-awesome.css
   */
  
  require('components/bootstrap/bootstrap');
  var modalTplFn = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">\n    <div class="modal-table">\n        <div class="modal-table-cell">\n            <div class="modal-dialog">\n                <div class="modal-content modal-dialog-center">\n                    <p class="modal-loading"><i class="fa fa-spinner fa-spin"></i></p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>';
}
return __p;
};
  var $ = require('components/jquery/jquery');
  
  // errorLevel 至少支持 danger、info、sucess、warning
  var modal = module.exports = function(url, opt) {
      var dom = $(modalTplFn());
  
      if ($.isPlainObject(url)) {
          opt = url;
          url = null;
      }
  
      dom
          .appendTo('body')
          .modal($.extend({
              keyboard: false,
              backdrop: 'static',
              remote: url,
              show: true
          }, opt || {}))
          .on('hide.bs.modal', function() {
              dom.remove();
          });
  };
  

});