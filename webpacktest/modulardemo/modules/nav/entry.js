module.exports={
    nav:function(){
        this.t=require("./template.html");
        require("./ui.css");
        var $=require("jquery")
        $("body").append($(this.t));
    }
};
