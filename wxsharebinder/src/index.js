function iextend(a,...b){
    return Object.assign({},a,...b);
}

var weixinshareBinder = (function() {
    var config = {
        "onMenuShareTimeline": {
            title: '',
            link: '',
            imgUrl: '',
            success:successHandler,
            cancel:cancelHandler
        },
        "onMenuShareAppMessage":{
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            type: '',
            dataUrl: '',
            success:successHandler,
            cancel:cancelHandler
        },
        "onMenuShareQQ":{
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            success:successHandler,
            cancel:cancelHandler
        },
        "onMenuShareWeibo":{
            title: '',
            desc: '',
            link: '',
            imgUrl: '',
            success:successHandler,
            cancel:cancelHandler
        }
    };
    var weixinInterfacesArray=[];
    $.each(config,function(k,v){
        weixinInterfacesArray.push(k);
    });
    function extend (s,e) {
        /*有值就覆盖,原来没有就不操作*/
        $.each(s,function(k,v){
            var newVal=e[k];
            if(newVal){
                s[k]=newVal
            }
        });
    }

    function successHandler(){

    }

    function cancelHandler() {

    }
    function wrap(fn,data){
        if(!fn){return false}else{
            return function(){
                var g=Array.prototype.slice.call(arguments,0).concat([data]);
                fn.apply(null,g);
            }
        }
    }
    function bindWeixinShareInterface(shareData) {
         wx.checkJsApi({
            jsApiList: weixinInterfacesArray,
            success: function(res) {
                $.each(config,function(k,v){
                    var apinameState=res.checkResult[k];
                    var g=$.extend({},shareData, {
                        success:shareData.success?wrap(shareData.success,k):wrap(successHandler,k),
                        cancel:shareData.cancel?wrap(shareData.cancel,k):wrap(cancelHandler,k)
                    });
					if(k=="onMenuShareTimeline"){
                        g.title=shareData.desc;
                    }
                    extend(v,g);
                    if(apinameState){
                        wx[k](v);
                    }
                })
            }
        });
    }
    return {
        getInterfaces: function() {
            return weixinInterfacesArray;
        },
        bind:bindWeixinShareInterface
    }
})();
