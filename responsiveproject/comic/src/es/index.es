define(['require', 'exports', 'module','common','swiper'], function(require, exports, module,common,swiper) {
  common.commonInit();
  $(window).resize();
  window.mySwiper = new Swiper('.swiper-container',{
    pagination:'.indexslider__pager',
    paginationClickable:true,
    grabCursor: true
  });
})
