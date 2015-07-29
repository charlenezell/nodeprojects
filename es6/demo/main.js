
require(["http://resource.a0bi.com/resource/js/lib/wxsharebinder/dest/index.js"],function(wx){
  document.querySelector(".a").innerHTML=wx.WxShare.usedWxInterface().join("---");
  window.xxx=wx;
  initWeixin(wx.WxShare);
});
var dataForWeixin = {
    width: "66",
    src: "http://aoqi.100bt.com/gwActivity/20150626/s1/icon.png",
    url: 'http://aoqi.100bt.com/gwActivity/20150626/s1/',
    title: "奥奇传说送福利，选精灵送IPAD，还有10万红包好礼等你拿，快来参加吧。",
    desc: "奥奇传说送福利，选精灵送IPAD，还有10万红包好礼等你拿，快来参加吧。",
    success: function(res) {
        console.log("hello")
    },
    cancel: function(res) {

    }
};
   function initWeixin(weixinshareBinder) {
       $.getJSON(nUtil.htmlTools.template("http://service.100bt.com/wx/jsapiSignature.jsonp?callback=?&appType=2&noncestr=${randomstr}&timestamp=${timestamp}&url=${url}", {
           randomstr: (Math.random() + "").slice(2),
           timestamp: new Date() - 0,
           url: encodeURIComponent(location.href.split('#')[0])
       }), function(data) {
           wx.config({
               debug: true,
               appId: data.appId,
               timestamp: data.timestamp,
               nonceStr: data.noncestr,
               signature: data.signature,
               jsApiList: [].concat(weixinshareBinder.usedWxInterface())
           });
           wx.ready(function() {
            document.querySelector(".a").innerHTML=document.querySelector(".a").innerHTML+"<p>configSuccess</p>";
               weixinshareBinder.bind(wx,{
                   title: dataForWeixin.title,
                   desc: dataForWeixin.desc,
                   link: dataForWeixin.url,
                   imgUrl: dataForWeixin.src,
                   type: 'link',
                   dataUrl: '',
                   success: dataForWeixin.success,
                   cancel: dataForWeixin.cancel
               });
           });
       });
   }
   // initWeixin();
