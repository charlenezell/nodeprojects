"use strict";
var path = require('path');
var Download=require("download");
var r_url = require('url');
var fs=require("fs");
var glob=require("glob");
// var URLS = process.argv[2].split(',');
var dir=process.argv[2];
var rootdir = dir;
var sites=[]
glob.sync(dir+"/*/*.json").forEach(function(v){
  sites=sites.concat({urls:JSON.parse(fs.readFileSync(v)).data,name:v.replace("./","").split("/").join(".")});
});

sites.forEach(function(data){
  var URLS=data.urls;
  var gamename=data.name;
  URLS.forEach(function (URL) {
    var uo = r_url.parse(URL);
    var filepath;
    console.log("downloading:----%s",URL);
    try{
    var r=Download().get(URL);
    filepath =path.join (rootdir  , uo.hostname , uo.pathname);
    if (uo.pathname[uo.pathname.length-1].trim() == '/') {
      r.dest(filepath);
      r.rename("index.html");
    } else {
      r.dest(path.dirname(filepath));
    }
    r.run(function(err,files){
      console.log("error in download->",files);
    });
    }catch(e){
      console.log(e);
    }
  });
})
