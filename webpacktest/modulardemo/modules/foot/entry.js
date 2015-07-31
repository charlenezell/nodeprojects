module.exports={
    foot:function(){
        this.t=require("./template.html");
        require("./ui.css");
        console.log(this.t);
        var $=require("jquery")
        $("body").append($(this.t));
    }
};
