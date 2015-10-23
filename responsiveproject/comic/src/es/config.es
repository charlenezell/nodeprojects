(function() {
  var host = "http://resource.a0bi.com/";
  var siteRoot="http://resouce.a0bi.com/marketnew/comic/";
  require.config({
    urlArgs: "rev=1.0.0",
    shim: {
      "jquery": {
        exports: "jQuery"
      }
    },
    paths: {
      "css": host + "resource/js/lib/css",
      "shimglobal": host + "resource/js/lib/shimglobal",
      "text": host + "resource/js/lib/text",
      "common":siteRoot+"dest/es/common",
      "swiper": siteRoot+"lib/swiper/idangerous.swiper.min",
      "sidebar": siteRoot+"dest/widget/sidebar/main",
      "sidebarcss": siteRoot+"dest/widget/sidebar/main"
    }
  });
})();
