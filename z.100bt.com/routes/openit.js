var express = require('express');
var router = express.Router();
var child_process = require("child_process");
var url=require("url");
var GPath=require("path");
/* GET users listing. */
router.get('/:encodedpath/:encodedurl', function(req, res, next) {
    var _path = req.params.encodedpath,
        _url = req.params.encodedurl;
    var finalPath = getPath(_path, _url);
    var cmd = "explorer /select," + finalPath;
    console.log(cmd);
    child_process.exec(cmd, function(err, stdout, stderr) {
        res.json({
            result: 'success',
            code: 0
        });
    })
});

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
module.exports = router;


function getPath(path, _url) {
    var ipath=path.replace(/\//g,"\\");
    var iurl=url.parse(_url);
    var gameName=iurl.host.split(".")[0];
    var uPath=iurl.pathname.split("/");
    if(iurl.hostname=="resource.a0bi.com"){
        gameName=iurl.pathname.split("/")[1];
        uPath=iurl.pathname.split("/").slice(2);
    }
    if(iurl.hostname=="www.100bt.com"){
        gameName="";
    }
    var rst=ipath+"web\\resource\\"+[gameName].concat(uPath).join("\\");
    rst=GPath.resolve(rst)
    console.log(rst);


    return rst;
}
