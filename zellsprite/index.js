"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sp = require("gulp.spritesmith");
var ld = require("lodash");
var es = require("event-stream");
var glob = require("glob");
var imagemin = require("gulp-imagemin");
var pngmin = require('gulp-pngmin');
var rename = require('gulp-rename');
var path = require("path");
var chalk = require('chalk');
var modulepath = __dirname;
function getRealName(w) {
    var a = w.split("/").pop();
    var realName = a.split("_").pop() + ".png";
    return realName;
}

function getParamList(_a) {
    /*v,h,s  默认用_分割，潜规则是图片命名不能有_*/
    var a = path.basename(_a);
    var arg = a.split("_");
    arg.pop();
    return arg;
}

function chooseAlgorithm(pathToCal) {
    var param = getParamList(path.basename(pathToCal));
    var g = [{
        name: "h",
        alg: "left-right"
    }, {
        name: "v",
        alg: "top-down"
    }, {
        name: "s",
        alg: "diagonal"
    }];
    var alg = "binary-tree",
        hit = false;
    g.forEach(function (v) {
        if (ld.includes(param, v.name) && !hit) {
            hit = true, alg = v.alg;
        }
    });
    return alg;
}
var defaultOption = {
    src: "./style/r_imgSrc/",
    dest: "./style/r_imgDest/",
    taskName: "sprite",
    templateFile: path.join(modulepath, "./sptemplate.hb")
};
function main(gulp) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var config = Object.assign({}, defaultOption, options);
    var configInfo = Object.keys(config).map(function (k) {
        return "using " + k + "=" + config[k];
    }).join("\n");
    console.log(chalk.bgGreen.red(configInfo));
    var dest = config.dest;
    var src = config.src;
    var taskName = config.taskName;
    var templateFile = config.templateFile;

    gulp.task(taskName, function () {
        var jobs = [];
        var spriteGlob = path.join(src, "*"); //图片目录的直接子项作为sprite图片的名字
        var _dest = path.join(dest);
        var cssBundles = [];
        var _map = glob.sync(spriteGlob).map(function (a) {
            var imgName = getRealName(a),
                imgName2 = ld.includes(getParamList(a), "jpeg") ? imgName.replace(path.extname(imgName), ".jpeg") : imgName,
                cssName = path.basename(a) + ".scss",
                allImgGlob = path.join(a, "**/*.{jpg,png}");
            var spMixStream = gulp.src(allImgGlob, { read: false }).pipe(sp({
                imgName: imgName2,
                cssName: cssName,
                engine: "gmsmith",
                imgPath: path.posix.join(dest, imgName2),
                algorithm: chooseAlgorithm(a),
                imgOpts: {
                    quality: 100
                },
                cssVarMap: function cssVarMap(sp) {
                    var spriteImgName = getRealName(a);
                    sp.name = spriteImgName.replace(path.extname(spriteImgName), "") + "_" + sp.name;
                },
                cssTemplate: templateFile
            }));

            cssBundles.extraData = {
                basePath: "./"
            };

            cssBundles.push(spMixStream.css);

            var needP8Renderer = ld.includes(getParamList(a), "p8");
            var hasOptimised = ld.includes(getParamList(a), "jpeg");
            if (needP8Renderer) {
                return spMixStream.img.pipe(pngmin()).pipe(gulp.dest(_dest));
            } else if (hasOptimised) {
                return spMixStream.img.pipe(gulp.dest(_dest));
            } else {
                return spMixStream.img.pipe(imagemin({
                    optimizationLevel: 3
                })).pipe(gulp.dest(_dest));
            }
        });
        var imgJob = es.concat.apply(null, _map);

        if (_map.length > 0) {
            jobs.push(imgJob);
        }
        cssBundles.forEach(function (v) {
            jobs.push(v.pipe(rename(function (path) {
                path.basename = "_" + getRealName(path.basename);
            })).pipe(gulp.dest(_dest)));
        });
        if (jobs.length > 0) {
            return es.concat.apply(this, jobs);
        }
    });
}

exports.default = main;