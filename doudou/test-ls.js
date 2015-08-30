var commander=require("commander");
var _=require("lodash");
var testCom=require("./test-com");
var fs=require("fs")

// console.log(process)
commander
    .option("-l,--limit <int>","取前多少个")
    .option("-o,--order <type>","排序规则n是名字,m是修改时间",/^(m|n)$/i,"n")
    .option("-k,--search <string>","关键字搜索")
    .parse(process.argv);


var orderMapFunction={
    m:function(g){
        var map={};
        g.forEach(function(v,k){
             map[v]=fs.statSync(testCom.doudouPath+v);
        });
        return g.sort(function(a,b){
           return map[a].mtime > map[b].mtime ?-1:1
        });
    },
    n:function(g){
        return g.sort(function(a,b){
            return parseInt(a.split("-")[0])>parseInt(b.split("-")[0])?-1:1;
        });
    }
};

function listAll(isFullPath){
    var g=_.chain(testCom.getAllGame()).map(function(ipath){
            return ipath.split(testCom.doudouPath)[1]
        });
    g=g.value();
    if(commander.order&&orderMapFunction[commander.order]){
        g=orderMapFunction[commander.order](g);
    }else{
        g=orderMapFunction["n"](g);
    }


    if(!_.isUndefined(commander.search)){
        g=g.filter(function(v){
            if(v.indexOf(commander.search)>-1){
                return true
            }else{
                return false
            }
        });
    }

    if(!_.isUndefined(commander.limit)){
        g=g.slice(0,~~commander.limit);
    }


    return g.join(" ");
}


console.log(testCom.specialSeperator+listAll())
