var w=[{"name":"天天酷飞","factor"    :"1"},
{"name":"天天切蛋糕","factor"   :"1"},
{"name":"奔跑吧兔子","factor"   :"1"},
{"name":"美味寿司卷","factor"   :"2"},
{"name":"超能战机","factor"    :"2"},
{"name":"美味樱桃蛋糕","factor"  :"2"},
{"name":"熊熊保卫战","factor"   :"2"},
{"name":"动物消消乐","factor"   :"2"},
{"name":"电影明星换装","factor":"3"},
{"name":"万圣节奇异装","factor":"3"},
{"name":"精灵泡泡龙","factor"   :"2"},
{"name":"漂亮手链DIY","factor":"3"},
{"name":"可爱形象沙龙","factor":"3"},
{"name":"女孩爱购物","factor":"3"},
{"name":"宠物美容院3","factor":"3"},
{"name":"宠物圣诞装扮","factor":"3"},
{"name":"打扮未来的自己","factor":"3"},
{"name":"欢乐曲奇工坊","factor"  :"2"},
{"name":"恐龙推草机","factor"   :"2"},
{"name":"野猪的点心","factor"   :"2"},
{"name":"可爱猫咪沙龙","factor":"3"},
{"name":"美丽糖罐DIY","factor":"3"},
{"name":"小猪医生的诊所","factor":"3"},
{"name":"史上最坑游戏","factor"  :"2"},
{"name":"绿野小精灵装扮","factor":"3"},
{"name":"萌宠大乐透","factor":"3"},
{"name":"时尚巴黎模特秀","factor":"3"},
{"name":"女孩约会日记","factor":"3"},
{"name":"草莓面膜DIY","factor":"3"},
{"name":"时尚嘉年华","factor":"3"},
{"name":"换皮游戏：熊出没连连看","factor" :"1"},
{"name":"换皮游戏：巧虎捉迷藏","factor"  :"1"},
{"name":"换皮游戏：巧虎连连看","factor"  :"1"},
{"name":"换皮游戏：海绵宝宝捉迷藏","factor"    :"1"},
{"name":"换皮游戏：海绵宝宝连连看","factor"    :"1"},
{"name":"换皮游戏：巧虎益智数字消除","factor"   :"1"},
{"name":"消消乐换皮游戏需求","factor"   :"1"}];
function a(){
var g=w.pop()
$.post("http://z.100bt.com/gamestate/20150410/create/",g).done(function(){
if(w.length>0){
a()
}
})
}
a()




excelScript below




var xlsx = require('node-xlsx');
var obj = xlsx.parse('G:/游戏需求模板.xlsx');
process.chdir('E:/projectA/source/web/myproject/z.100bt.com')
var low = require('lowdb');
low.mixin(require('underscore-db'))
var db=low("20150410.json");
var games=db("games")
function getPriorityName(name){
    var g={
        "高":1,
        "中":2,
        "低":3
    };
    return g[name]||g["低"];
}
obj[0].data.slice(1).forEach(function(v){games.insert({name:v[0],link:v[1],shareword:v[2],priority:getPriorityName(v[3])})})
