#!/usr/bin/env node
var inquirer = require("inquirer");
var datef = require('datef');
// var gulp = require("gulp");
var lodash = require("lodash");
var dest = process.cwd();
var path=require("path");
var fs = require('vinyl-fs');
var map = require('map-stream');
var asciify=require("asciify");
var cfs=require("fs");
var config = {};
var templateData = {
    aobi: {
        favTitle: "百田奥比岛-超萌形象,精彩纷呈梦幻萌小岛!",
        name: "奥比岛",
        url: "http://aobi.100bt.com/"
    },
    aola: {
        favTitle: "百田奥拉星-超萌宠物!酷炫对战!快乐冒险!",
        name: "奥拉星",
        url: "http://aola.100bt.com/"
    },
    lds: {
        favTitle: "百田龙斗士-开辟龙与魔法的冒险传奇!",
        name: "龙斗士",
        url: "http://lds.100bt.com/"
    },
    aoya: {
        favTitle: "百田奥雅之光-多职变身!炫酷战斗!唯美梦幻的华丽游戏!",
        name: "奥雅之光",
        url: "http://aoya.100bt.com/"
    },
    aoqi: {
        favTitle: "百田奥奇传说-开启多精灵对阵新时代!",
        name: "奥奇传说",
        url: "http://aoqi.100bt.com/"
    },
    yg: {
        favTitle: "百田阳光星球",
        name: "阳光星球",
        url: "http://www.100bt.com/yg/"
    },
    v: {
        favTitle: "百田动漫",
        name: "百田动漫",
        url: "http://v.100bt.com/"
    },
    bt: {
        favTitle: "百田网",
        name: "百田网",
        url: "http://www.100bt.com/"
    },
    qq: {
        favTitle: "百田圈圈–全国最大的儿童交流天地!",
        name: "百田圈圈",
        url: "http://qq.100bt.com/"
    },
    zl: {
        favTitle: "百田知了-全国最大的儿童问答平台!",
        name: "百田知了",
        url: "http://zl.100bt.com/"
    },
    zj: {
        favTitle: "百田奥奇战记-体验多种职业与伙伴一起战斗",
        name: "奥奇战记",
        url: "http://zj.100bt.com/"
    },
    kd: {
        favTitle: "百田魔王快打-为梦想而战",
        name: "魔王快打",
        url: "http://kd.100bt.com/"
    },
    ac: {
        favTitle: "百田特战英雄-真3D第一个人称射击",
        name: "特战英雄",
        url: "http://ac.100bt.com/"
    }
};
asciify('Z-Boot', {
    color: "green",
    font: 'larry3d',
    maxWidth: 90
}, function(err, result) {
    console.log(result);
    inquirer.prompt([{
            type: "list",
            name: "siteName",
            message: "这是神马专题？",
            choices: lodash.keys(templateData)
        }, {
            type: "input",
            name: "T",
            message: "页面标题",
            default: "百田网页面标题"
        }, {
            type: "input",
            name: "D",
            message: "页面描述",
            default: "百田网页面描述"
        }, {
            type: "input",
            name: "K",
            message: "页面关键字",
            default: "百田网页面关键字"
        }, {
            type: "input",
            name: "siteRootPath",
            message: "网页根路径",
            default: "http://www.100bt.com/some/site/path/"
        }, {
            type: "checkbox",
            message: "选择站点类型",
            name: "siteType",
            choices: [{
                name: "web",
                checked: true
            }, {
                name: "wap"
            }],
            validate: function(answer) {
                if (answer.length < 1) {
                    return "You must choose at least one topping.";
                }
                return true;
            }
        },
        /*{
    type: "input",
    name: "sitePath",
    message: "站点相对于相应站点gwActivity下的路径:形如'20150701/'",
    default: function() {
        return datef('YYYYMMdd/', new Date());
    }
},*/
        {
            type: "input",
            name: "shareWord",
            message: "分享语",
            default: "这是分享语"
        }, {
            type: "input",
            name: "sharePic",
            message: "分享图路径",
            default: "share.jpg"
        }, {
            type: "input",
            name: "shareTitle",
            message: "分享标题",
            default: "分享标题"
        }
        /*,{
            type: "input",
            name: "deployRootPath",
            message: "本地Deploy的根路径",
            default: "D:/home/site/web/"
        }*/
    ], function(answers) {
        answers.hasWap = lodash.contains(answers.siteType, "wap") ? "ok" : "";
        answers.hasWeb = lodash.contains(answers.siteType, "web") ? "ok" : "";
        answers.siteData = templateData[answers.siteName];
        /*取消配置的编译，因为最后输出到模板里面会以配置形式去
        修改，这里可以不需这么智能*/
        // console.log(answers);
        // config = precompile(answers, function(str) {
        //     try {
        //         var compiled = lodash.template(str);
        //         return compiled(answers);
        //     } catch (e) {
        //         return str;
        //     }
        // });
        /*lodash.extend(config, {
            activityPath: 'gwActivity/',
        });*/
        config = answers;
        console.log(config);
        var envPath = path.join(__dirname, "..");

        var buildCollection = [path.join(envPath , "root/**/*.{html,js,css,scss}"), path.join("!" + envPath , "root/gulpfile.js")];

        var buildCollection3 = [path.join(envPath , "root/resource/**/*.{jpg,png}")];

        if (!answers.hasWap) {
            buildCollection.push(path.join('!' + envPath , 'root/wap/**/*'));
            buildCollection3.push(path.join('!' + envPath , 'root/resource/wap/**/*.{jpg,png}'));
        }
        if (!answers.hasWeb) {
            buildCollection.push(path.join('!' + envPath , 'root/web/**/*'));
            buildCollection3.push(path.join('!' + envPath , 'root/resource/web/**/*.{jpg,png}'));
        }

        fs.src(buildCollection)
            // .pipe(map(ldTemplate))
            .pipe(fs.dest(path.join(dest, "/src/")));

        fs.src(buildCollection3)
            .pipe(fs.dest(path.join(dest, "./resource")));

        var envjsonData = JSON.parse(cfs.readFileSync(path.join(envPath , "root/env.json")).toString());

        lodash.extend(envjsonData, config);

        cfs.writeFileSync(path.join(envPath,"root/env.json"), JSON.stringify(envjsonData, null, "\t"));

        fs.src([
                path.join(envPath, "root/gulpfile.js"),
                path.join(envPath, "root/package.json"),
                path.join(envPath, "root/sptemplate.hb"),
                path.join(envPath, "root/readme.md"),
                path.join(envPath, "root/env.json")
            ]).pipe(map(ldTemplate))
            .pipe(fs.dest(dest));

    });
});

// function precompile(obj, cb) {
//     var rst = {};

//     function envPath(path, k, value) {
//         var w = eval(path);
//         w[k] = value;
//     }

//     function mergePath(base, path) {
//         if (lodash.isNumber(path)) {
//             return base + "[" + path + "]";
//         } else {
//             return base + "['" + path.toString().trim() + "']";
//         }

//     }

//     function a(path, value) {
//         lodash.forEach(value, function(v, k) {
//             if (lodash.isArray(v)) {
//                 envPath(path, k, []);
//                 a(mergePath(path, k), v)
//             } else if (lodash.isPlainObject(v)) {
//                 envPath(path, k, {});
//                 a(mergePath(path, k), v)
//             } else {
//                 envPath(path, k, cb(v));
//             }
//         });
//     }
//     a("rst", obj);
//     return rst;
// }

function ldTemplate(file, cb) {
    var content = file.contents;
    try {
        var compiled = lodash.template(content);
        file.contents = new Buffer(compiled(config));
        cb(null, file);
    } catch (e) {
        console.log(e);
    }
}
