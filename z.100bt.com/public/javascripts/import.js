$(function(){
    $("#submitBtn").click(function(){
        var fileField=$("#importxlsx")[0];
        var dbName=$("#dbName").val();
        var oMyForm = new FormData();
        var isAppend=$("input:radio[name=isAppend]:checked").val();
        oMyForm.append("isAppendData",isAppend);
        if(fileField.files.length<=0){
            alert("no file there!");
            return false ;
        }
        oMyForm.append("importxlsx", fileField.files[0]);
        var oReq = new XMLHttpRequest();
         oReq.onreadystatechange = function(data){
                //判断对象状态是否交互完成，如果为4则交互完成
                if(oReq.readyState == 4) {
                     //判断对象状态是否交互成功,如果成功则为200
                    if(oReq.status == 200) {
                        //接收数据,得到服务器输出的纯文本数据
                        var response = oReq.responseText;
                        //得到div的节点将数据显示在div上
                       alert(response.result);
                    }
                }
         };
        oReq.open("POST", "http://z.100bt.com/gamestate/"+dbName+"/import");
        oReq.send(oMyForm);
        return false;
    })
})
