var system = require('system'),
  fs=require('fs');
  var spawn = require("child_process").spawn;
  var zURL;
  (function(){
    function n(t) {
        return t.match(s)[3]
    }
    function i(t) {
        return t.match(s)
    }
    function o(t, n) {
        return a(t.match(s)[8], n)
    }
    function e(t, n) {
        return a(t.match(s)[9] ? t.match(s)[9].substring(1) : !1, n)
    }
    function a(t, n) {
        if (t) {
            var i, o, e = new RegExp("(?:^|&)" + n + "(?:[=]?)(.*?)(?=&|$)","i"), a = new RegExp("(?:^|&)(.+?)(?=&|$)","gi"), s = {};
            if (n)
                return i = e.exec(t),
                i ? i[1] : null ;
            for (; o = a.exec(t); ) {
                var r = o[1].match(/(^[a-zA-Z0-9]+?)=(.*)/);
                r ? s[$.trim(r[1])] = r[2] : s[$.trim(o[1])] = ""
            }
            return s
        }
        return {}
    }
    var s = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/;
    zURL = {
        getDomain: n,
        getSearchQuery: o,
        getHashQuery: e,
        getQuerys: a,
        getParts: i
    }
  })();
  var data=fs.read("./game.json");
  var buildName="./"+new Date().toISOString().replace(/:/img,'')+"/";
  fs.makeDirectory(buildName);
  try{
    data=JSON.parse(data);
  }catch(e){
    data={};
  }
  var w=0;
  function done(){
    w++;
    if(w>=data.games.length){
      phantom.exit();
    }
  }
  if(data.games){
    data.games.forEach(function(v,k){
        getResource(v.url,v.name,done);
    });
  }else{
    console.log("check configformat pls");
    phantom.exit();
  }

  function getResource(address,gamename,done){
    var resourceNumb=0;
    var page = require('webpage').create();
    var urls = [];
    page.address = address;
    var itimeout=0,isDone=false;
    page.settings.resourceTimeout=20*1000;
    page.onResourceRequested = function (res) {
      clearTimeout(itimeout);
      resourceNumb++;
      console.log("add|||||"+res.url+"||||resourceNumb: ==="+gamename+">"+resourceNumb);
      // if (res.stage === 'start') {
        /*自己站点*/
        // if(res.url.search(zURL.getDomain(address))>=0&&res.url.search(/\.(jpg|jpeg|png|mp3|mp4|svg|ogg|gif|js|css|json,html,htm)/img)>=0){
          // console.log(zURL.getDomain(address),zURL.getDomain(res.url))
        if(address==res.url||zURL.getDomain(address)==zURL.getDomain(res.url)&&res.url.search(/\.(jpg|jpeg|png|gif|js|css|json,html,htm)/img)>=0){
          urls.push(res.url);
        }
      // }
    };
    page.onResourceError=function(response){
      // resourceNumb--;
      // console.log("consume ERR ||||"+response.url+"|||| resourceNumb: ==="+gamename+">"+resourceNumb);
    }
    page.onResourceTimeout=function(response){
      // resourceNumb--;
      // console.log("consume TIMEOUT ||||"+response.url+"|||| resourceNumb: ==="+gamename+">"+resourceNumb);
      // if(resourceNumb==0&&isDone!=true){
      //   itimeout=setTimeout(function(){
      //     makeDownloadFile(gamename);
      //   },5000);
      // }
    }
    page.onResourceReceived=function(response){
        if(response.stage=="end"){
          resourceNumb--;
          console.log("consume SUCCESS ||||"+response.url+"|||| resourceNumb: ==="+gamename+">"+resourceNumb);
          if(resourceNumb<=1&&isDone!=true){
            itimeout=setTimeout(function(){
              makeDownloadFile(gamename);
            },8000);
          }
        }
    }


      function makeDownloadFile(gamename){
        if(isDone){return }
          fs.write("hehe.json",'{"data":['+urls.map(function(v){return '"'+v+'"'}).join(",")+']}');
          done();
        // isDone=true;
        // var rootdir=buildName+gamename;
        // fs.makeDirectory(rootdir);
        // console.log("makeDownloadFile!!!")
        // var child = spawn("node", ["downloadresource.js", urls.join(','),rootdir+"/"])
        // child.on("exit", function (code) {
        //   console.log("exit?")
        //  done();
        // })
        // child.stdout.on("data", function (data) {
        //        console.log(data);
        //       });
        //       child.stderr.on("data", function (data) {
        //        console.log(data);
        //       });
      }

    page.open(page.address, function (status) {
      var har;
      if (status !== 'success') {
        console.log("fail in download -->"+address);
        done();
      } else {
       console.log("success in loading main file ,waiting for finished~xx")
      }

    });


  }

