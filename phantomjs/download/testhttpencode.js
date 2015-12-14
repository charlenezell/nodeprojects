// var http = require("http"),
//   fs = require("fs"),StringDecoder = require('string_decoder').StringDecoder;
// http.get("http://sda.4399.com/4399swf/upload_swf/ftp17/ssj/20150824/j2/y/index.html", function(res) {
//   // res.setEncoding('utf8');
//   // res.pipe(require("fs").createWriteStream("./xiaoming.txt"))
//   // res.setEncoding('utf8');
//   var body="";
//     res.on('data', function (chunk) {
//       body += chunk;
//     });
//     res.on('end', function () {
//       console.log(body)
//     });
// })
var iconv = require('iconv-lite')
var request = require('request');
  var jschardet = require("jschardet");
  var Download = require('download');
  var path=require("path")
var a=["http://sda.4399.com/4399swf/upload_swf/ftp17/ssj/20150824/j2/y/main.js","http://sda.4399.com/4399swf/upload_swf/ftp17/ssj/20150824/j2/y/"]
a.forEach(function(v,k){
  var r=Download().get(v);
  var p=v.replace("http://",'');
  if(!path.extname(v)){
    r.dest(p);
    r.rename("index.html");
  }else{
    r.dest(path.dirname(p))
  }
  r.run();
})
// rquest('http://sda.4399.com/4399swf/upload_swf/ftp17/ssj/20150824/j2/y/main.js', function (error, response, body) {
  // var rst=jschardet.detect(body);
  // if(rst.encoding){
  //   response.setEncoding(rst.encoding);
  // }else{
  //   body=iconv.encode(body);
  // }
  // console.log(rst)
  // var html=iconv.encode("utf8")()
  // console.log(iconv.encode(iconv.decode(body,rst.encoding),"utf8"));
  // if (body[0] == 0xEF && body[1] == 0xBB && body[2] == 0xBF) {
  //   var html = iconv.decode(body, 'utf8')
  // }else{
  //   var html = iconv.decode(body, 'gbk')
  // }
  // response.setEncoding('utf8');
// console.log(body)
// })
