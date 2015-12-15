"use strict";
var path = require('path');
var Download=require("download");
var r_url = require('url');
var fs=require("fs");
var ld=require("lodash");
var glob=require("glob");
var inquirer = require("inquirer");
var ui = new inquirer.ui.BottomBar();
// var URLS = process.argv[2].split(',');
var dir=process.argv[2];
var rootdir = dir;
var sites=[]
glob.sync(dir+"/*/*.json").forEach(function(v){
  var name=path.basename(v).replace(path.extname(v),"");
  sites=sites.concat({urls:JSON.parse(fs.readFileSync(v)).data,name:name});
});
var globalState={
  siteLength:sites.length
};
function renderUI(){
  var gamestates=ld.map(globalState.games,function(v,k){
      return `${k}(${v.orglength-v.ilength}/${v.orglength})`;
  }).join("====");
  ui.updateBottomBar(`你有${globalState.siteLength}个游戏在下载,信息如下：${gamestates}....请稍后`);
}
globalState.games={};
sites.forEach(function(data){
  var URLS=data.urls;
  var gamename=data.name;
  var stateObj={ilength:data.urls.length,orglength:data.urls.length};
  globalState.games[gamename]=stateObj;
  URLS.forEach(function (URL) {
    var uo = r_url.parse(URL);
    var filepath;
    // console.log("downloading:----%s",URL);
    try{
    var r=Download().get(URL);
    filepath =path.join (rootdir  , gamename, uo.hostname , uo.pathname);
    if (uo.pathname[uo.pathname.length-1].trim() == '/') {
      r.dest(filepath);
      r.rename("index.html");
    } else {
      r.dest(path.dirname(filepath));
    }
    r.run(function(err,files){
      renderUI();
      if(err){
        // console.log("error in download->",err,files,URL);
      }else{
        // console.log("success in download->%s",URL);
      }
      --stateObj.ilength;
      renderUI();
      // console.log("game %s has %s resource left",gamename,);
    });
    }catch(e){
      console.log("EEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRR%s",e);
    }
  });
})
