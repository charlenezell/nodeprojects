// var grunt=require("grunt");
var util = require('util');
var fs = require("fs");
var commander = require("commander");
var grunt = require("grunt");
var file = grunt.file;
var testCom = require("./test-com");
var _ = require("lodash");
var child_process = require("child_process");
var path = require("path");
var async = require("async");
var winattr=require("winattr");



grunt.option.init({
    verbose:true,
    debug: true
});

var allGame = testCom.getAllGame();
var allGameName = allGame.map(function(v) {
        return v.split(testCom.doudouPath)[1];
    });
commander
    .option("-a,--allGame [a]", "构造目录下所有游戏")
    .option("-c,--tfscheckout", "帮你获取然后签出修改")
    .option("-p,--pipeSupport","支持|操作")
    .usage("<gameArray> [option]")
    .parse(process.argv);

// process.stdin.resume(); on data 会打开这个东西
process.stdin.setEncoding('utf8');
var idata = []

if (commander.allGame) {
    doBuild("all");
    return
}
// console.log(process);
if(commander.args.length==0&&!commander.pipeSupport){
    commander.help();
}
if(!commander.pipeSupport){
    grunt.log.debug("route into justArg")
    doBuild("justArg");
}else{
    process.on('SIGBREAK', function() {
        doBuild("cmdBREAK");
    })

    process.stdin.on("end", function() {
        // console.log("end");
        doBuild("main");
    });

    process.stdin.on('data', function(data) {
        // console.log("data");
        idata.push(data);
    });
}

function parseLsPipeData(data){
    var innerData = data[0].replace(testCom.specialSeperator, "").replace(/\n/, "").split(" ");
    return innerData;
}

function parseInnerData(innerData){
    /*uniq and must in all game list*/
    var w=_.uniq(innerData).filter(function(v, k) {
        return _.indexOf(allGameName, v) > -1 ? true : false;
    });
    grunt.log.debug("filtered to Be:%s", w);
    grunt.log.ok("%d games are going to be builded",w.length);
    return w;
}

function doBuild(method) {
    var ag={
        main:function(){
            idata=parseLsPipeData(idata);
            var innerData = idata.concat(commander.args);
            innerData=parseInnerData(innerData);
            grunt.log.debug(innerData);
            async.series(innerData.map(function(v){
                return function(callback){
                    grunt.log.ok("you are building : %s", v);
                    build(v, callback);
                }
            }))
        },
        cmdBREAK:function(){
            console.log("这个没想好怎么好但是这个很少用到的。。。")
            var innerData = idata.map(function(v){
                return v.replace("\r\n","");
            }).concat(commander.args);
            innerData=parseInnerData(innerData);
            grunt.log.debug(innerData);
            async.series(innerData.map(function(v){
                return function(callback){
                    grunt.log.ok("you are building : %s", v);
                    build(v, callback);
                }
            }))
        },
        justArg:function(){
            grunt.log.debug("in justArg")
            var innerData=parseInnerData(commander.args);
            grunt.log.debug(innerData);
            async.series(innerData.map(function(v){
                return function(callback){
                    grunt.log.ok("you are building : %s", v);
                    build(v, callback);
                }
            }))
        },
        all:function(){
            grunt.log.debug("in all method");
            var innerData=parseInnerData(allGame.map(function(v, k) {
                return v.split(testCom.doudouPath)[1];
            }));
            grunt.log.debug(innerData);
            async.series(innerData.map(function(v) {
                return function(callback) {
                    grunt.log.ok("you are building : %s", v);
                    build(v, callback);
                }
            }));
        }
    }

    var _method=ag[method]||ag["main"];
    _method();
}

function build(gameName, callback) {
    function doit(){
        grunt.log.debug("in doit")
         execCmd(gameName,cmd,function(){
            commonCleanUp({localConfigFile:{
                has:orginHas,
                data:{
                    fileName:g+"config.ftl"
                }
            }})
        },callback);
    }
    var p = testCom.doudouPath,
        g = p + gameName + "/",
        theconfig = p + "config.ftl",
        localConfig = g + "config.ftl",
        ftl = path.normalize(g + "content.ftl"),
        config = path.normalize(g + "../locals.config"),
        output = path.normalize(g + "index.html");
    // var cmd = util.format("fmpp -s %s -o %s -C %s", ftl, output, config);
    var cmd = util.format("fmpp -s %s -o %s", ftl, output);
    var orginHas = file.exists(localConfig);
    if (!orginHas) {
        grunt.log.debug("本地不存在")
        // grunt.log.debug("copy:%s to %s",theconfig,localConfig);
        file.copy(theconfig, localConfig);
    }
    if(!file.exists(output)){
        grunt.log.warn("output html not exist in fs : %s,i'll create one for you",output);
        file.write(output,"");
    }
    // doit();
    var attr=winattr.getSync(output);
        grunt.log.debug("getting index.html attr");
        //{ archive: false, hidden: false, readonly: true, system: false }
        if(!attr.readonly){
           doit();
        }else if(commander.tfscheckout){
            cmd = util.format("tf get %s&& tf checkout %s&&fmpp -s %s -o %s -C %s", output, output, ftl, output, config);
            doit();
        }else{
            grunt.log.warn("这个文件是只读的哟，要嘛自己改属性要嘛就签出吧，签出的话可以使用build -c他会帮你获取然后签出")
        }
}

function commonCleanUp(option){
    // console.log(option.localConfigFile.has)
    if (!option.localConfigFile.has) {
        file.delete(option.localConfigFile.data.fileName, {
            force: true
        });
    }
}

function execCmd(gameName,cmd,cleanUpCb,callback){
    grunt.log.debug("cmd",cmd)
    child_process.exec(cmd, function(error, stdout, stderr) {
        // console.log('stdout: ' + stdout);
        // console.log('stderr: ' + stderr);
        cleanUpCb();
        if (error !== null || stdout.search('fmpp.FmppFileOutputWriter.createFileWriter') > -1) {
            console.log('exec error: ' + error);
            grunt.log.warn("you may not checkout or the index.html file is readonly? checkout your self or use -c automactically checkout for you");
            return false;
        } else {
            // console.log(callback)
            callback && callback();
            grunt.log.success("success in building:" + gameName);
        }
    });
}
