var glob=require("glob");
// console.log(process)
// var doudouPath= "e:/projectA/source/doudou/WebRoot/play/"
var doudouPath= "E:/projectA/source/doudou/WebRoot/play/"
module.exports.getAllGame=function(){
    return glob.sync(doudouPath+"*").filter(function(ipath){
            return /^\d+-\w+(?!\.\w+)$/.test(ipath.split(doudouPath)[1]);
            // return true
        })
}

module.exports.doudouPath=doudouPath;
module.exports.specialSeperator="     ";
