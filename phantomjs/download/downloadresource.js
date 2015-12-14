"use strict";
var path = require('path');
var Download=require("download");
var r_url = require('url');
var fs=require("fs");
// var URLS = process.argv[2].split(',');
var rootdir = "./xixi/";
console.log("hello")
var URLS=JSON.parse(fs.readFileSync("hehe.json")).data;
URLS.forEach(function (URL) {
  var uo = r_url.parse(URL);
  var filepath;
  console.log("downloading:----%s",URL);
  var r=Download().get(URL);
  if (uo.pathname[uo.pathname.length-1].trim() == '/') {
    filepath = path.join(rootdir ,  uo.pathname)
    r.dest(filepath);
    r.rename("index.html");
  } else {
    filepath =path.join (rootdir  , uo.hostname , uo.pathname);
    r.dest(path.dirname(filepath));
  }
  r.run();
});
