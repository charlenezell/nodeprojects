  define(['require', 'exports', 'module','css!sidebarcss'], function(require, exports, module) {
    exports.init = function() {
      var html = `<aside class="gc_sidebar">
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://aola.100bt.com/" target="_blank">奥拉星</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://aoqi.100bt.com/" target="_blank">奥奇传说</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://aobi.100bt.com/" target="_blank">奥比岛</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://lds.100bt.com/" target="_blank">龙斗士</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://aoya.100bt.com/" target="_blank">奥雅之光</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://www.100bt.com/game/videos/" target="_blank">游戏视频</a></div>
              <div class="gc_sidebar__wbtn"><a class="gc_sidebar__btn" href="http://www.100bt.com/game/pics/" target="_blank">游戏图片</a></div>
              <div class="gc_sidebar__wbtn hide gc_sidebar__wbtn__backtotop"><a class="gc_sidebar__btn gc_sidebar__btn--last" href="###"><span class="gc_sidebar__topicon"></span></a></div>
          </aside>`;
      $("body").append($(html));
      var root = $(".gc_sidebar");
      var thres = 1250;
      $(".gc_sidebar__topicon",root).parent().on("click", function() {
        $("html,body").animate({
          scrollTop: 0
        }, 200);
      });
      $(window).resize(function() {
        var w = $(window).width();
        if (w <= thres) {
          $(".gc_sidebar").addClass("gc_sidebar--lowResSidebar").removeClass("gc_sidebar--highResSidebar");
        } else {
          $(".gc_sidebar").addClass("gc_sidebar--highResSidebar").removeClass("gc_sidebar--lowResSidebar");
        }
      }).resize();
      var topBtn=$(".gc_sidebar__wbtn__backtotop",root);
      $(window).scroll(function(){
        var g=$(window).scrollTop();
        if(g>0){
          topBtn.show();
          topBtn.prev().find('.gc_sidebar__btn').removeClass("gc_sidebar__btn--last");
        }else{
          topBtn.hide();
          topBtn.prev().find('.gc_sidebar__btn').addClass("gc_sidebar__btn--last");
        }
      }).scroll();
    }
  });
