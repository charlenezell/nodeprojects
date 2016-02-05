const sp = require("gulp.spritesmith");
const ld = require("lodash");
const es = require("event-stream");
const glob = require("glob");
const imagemin = require("gulp-imagemin");
const pngmin = require('gulp-pngmin');
const rename = require('gulp-rename');
const path = require("path");
const chalk = require('chalk');
const modulepath=__dirname;
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
    g.forEach(function(v) {
        if (ld.includes(param, v.name) && !hit) {
            hit = true, alg = v.alg;
        }
    });
    return alg;
}
const defaultOption={
    src : "./style/r_imgSrc/",
    dest : "./style/r_imgDest/",
    taskName : "sprite",
    templateFile : path.join(modulepath, "./sptemplate.hb")
};
function main(gulp, options={}) {
    var config = Object.assign({},defaultOption,options);
    var configInfo=Object.keys(config).map((k)=>{
        return `using ${k}=${config[k]}`;
    }).join("\n");
    console.log(chalk.bgGreen.red(configInfo));
    let {
        dest,
        src,
        taskName,
        templateFile
    }=config;
    gulp.task(taskName, function() {
        let jobs = [];
        let spriteGlob = path.join(src,"*");//图片目录的直接子项作为sprite图片的名字
        let _dest = path.join(dest);
        let cssBundles = [];
        let _map = glob.sync(spriteGlob).map((a)=>{
            let imgName = getRealName(a),
                imgName2 = ld.includes(getParamList(a), "jpeg") ? imgName.replace(path.extname(imgName), ".jpeg") : imgName,
                cssName = path.basename(a) + ".scss",
                allImgGlob = path.join(a, "**/*.{jpg,png}");
            var spMixStream = gulp.src(allImgGlob).pipe(sp({
                imgName: imgName2,
                cssName: cssName,
                engine: "gmsmith",
                imgPath: path.posix.join(dest, imgName2),
                algorithm: chooseAlgorithm(a),
                imgOpts: {
                    quality: 100
                },
                cssVarMap: function(sp) {
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
        cssBundles.forEach(function(v) {
            jobs.push(v.pipe(rename(function(path) {
                path.basename = "_" + getRealName(path.basename);
            })).pipe(gulp.dest(_dest)));
        });
        if (jobs.length > 0) {
            return es.concat.apply(this, jobs);
        }
    });

}

export default main;
