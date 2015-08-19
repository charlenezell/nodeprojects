'use strict'
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    wrap = require("gulp-wrap"),
    mkdirp=require("mkdirp"),
    gulpif = require('gulp-if'),
    concat = require("gulp-concat"),
    cssmin = require('gulp-minify-css'),
    htmlmin = require("gulp-minify-html"),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    stylish = require('jshint-stylish'),
    sp = require("gulp.spritesmith/"),
    imagemin = require("gulp-imagemin"),
    path = require("path"),
    pngmin = require('gulp-pngmin'),
    merge = require("merge-stream"),
    es = require("event-stream"),
    glob = require("glob"),
    streamqueue = require('streamqueue'),
    del = require("del"),
    ld = require("lodash/"),
    fs = require("fs"),
    rev = require("gulp-rev"),
    useref = require('gulp-useref'),
    replace = require("zell-grr"),
    os = require("os");

/*1.读取项目配置检测必须的东西*/
var configjson = {};
try {
    configjson = JSON.parse(fs.readFileSync("env.json").toString());
} catch (e) {
    throw e;
}
if (!configjson.deployPath) {
    throw new Error("env.json deployPath require");
}
if (!configjson.spriteGeneratTemplate) {
    throw new Error("env.json spriteGeneratTemplate require");
}
if (!configjson.sourceUrl) {
    throw new Error("env.json sourceUrl require");
}
if (!configjson.resourcePath) {
    throw new Error("env.json resourcePath require");
}

/*流程定义
    改变重新编译部分
        耗时资源编译watchResource(sprite生成sass和less中间代码,图片生成与部署)
        文本资源编译watchSrcCode(jsmin,cssmin,htmlmin,bundle生成,rev,replace)
*/
// gulp.task("default",["buildResource"]);
gulp.task("watchResource",["deployResource"])
gulp.task("watchSrcCode",["deploySrcCode"])
gulp.task("deployResource",["buildResource"]);
gulp.task("deploySrcCode",["buildSrcCode"]);
gulp.task("buildResource",["sprite","optimizeBackgroundImage"]);
gulp.task("sprite",function(){
    var resourceGlob=path.join(configjson.resourcePath,"*");
    var subSites = ld.compact(glob.sync(resourceGlob)
        .map(function(v) {
            if (fs.statSync(v).isDirectory()) {
                return v;
            } else {
                return false;
            }
    }));
    var jobs = [];
    var cssBundles = {};
    var queues = [];

    subSites.forEach(function(v) {
        var spriteGlob=path.join(resourceGlob,"/**/img/sprite/*");
        var queue = new streamqueue({
            objectMode: true
        });
        queue.__root = path.basename(v);
        queues.push(queue);
        cssBundles[v] = [];
        var _map = glob.sync(spriteGlob).map(function(a) {

            function getRealName(w) {
                var a = w.split("/").pop();
                var realName = a.split("_").pop() + ".png";
                return realName;
            }

            function getParamList(_a) {
                /*p8,v,h,s  默认用_分割，潜规则是图片命名不能有_*/
                var a = path.basename(_a);
                var arg = a.split("_");
                arg.pop();
                return arg;
            }
            function chooseAlgorithm(pathToCal){
                var param=getParamList(path.basename(pathToCal));
                var g=[{
                    name:"h",
                    alg:"left-right"
                },{
                    name:"v",
                    alg:"top-down"
                },{
                    name:"s",
                    alg:"diagonal"
                }];
                var alg="binary-tree",hit=false;
                g.forEach(function(v){
                    if(ld.contains(param,v.name)&&!hit){
                        hit=true,alg=v.alg;
                    }
                });
                return alg;
            }
            var imgName = getRealName(a),
                cssName = path.basename(a) + ".scss",
                allImgGlob=path.join(a,"**/*.{jpg,png}");
                console.log(imgName,cssName);

            var spMixStream = gulp.src(allImgGlob).pipe(sp({
                imgName: imgName,
                cssName: cssName,
                imgPath: "img/sprite/" + imgName,
                algorithm: chooseAlgorithm(a),
                cssVarMap: function(sp) {
                    var spriteImgName = getRealName(a);
                    sp.name = spriteImgName.replace(path.extname(spriteImgName),"") + "_" + sp.name;
                },
                cssTemplate: configjson.spriteGeneratTemplate
            }));

            var _basePath = path.relative(configjson.resourcePath, a);
            _basePath = path.join(_basePath, "..");
            cssBundles[v].extraData = {
                basePath: _basePath
            };
            cssBundles[v].push(spMixStream.css);
            var needP8Renderer=ld.contains(getParamList(a), "p8");
            if (needP8Renderer) {
                spMixStream.img.pipe(pngmin())
            } else {
                spMixStream.img.pipe(imagemin({
                    optimizationLevel: 0
                }))
            }
            return spMixStream.img.pipe(gulp.dest("dest/" + _basePath));
        });
        var imgJob = es.concat.apply(null, _map);
        if (_map.length > 0) {
            jobs.push(imgJob);
        }
        cssBundles[v].forEach(function(v) {
            queue.queue(v);
        });
        queue.done();
    });

    queues.forEach(function(v) {
        jobs.push(v.pipe(concat("sprite.scss")).pipe(gulp.dest("./src/" + v.__root + '/')));
    });

    if (jobs.length > 0) {
        return merge.apply(this, jobs);
    }
});
gulp.task("optimizeBackgroundImage",function(){
    var bgGlob=path.join(configjson.resourcePath,"/**/img/bg/**/*.{jpg,png}");
    return gulp.src(bgGlob).pipe(imagemin({
        progressive: true,
        optimizationLevel: 3
    })).pipe(gulp.dest("./dest/"));
});
gulp.task("buildSrcCode",["replace"]);
gulp.task("replace",["rev"],function(){

});
gulp.task("rev",["makeRevMap"],function(){

});
gulp.task("makeRevMap",["javascript","stylesheet"],function(){

});
gulp.task("javascript",function(){
    return gulp.src("src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest("dest/"));
});
gulp.task("stylesheet",["css"],function(){

});
gulp.task("css",["sass"],function(){
    return gulp.src("src/**/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin({
                compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
           }))
        .pipe(gulp.dest("dest/"));
});
gulp.task("sass", function() {
    var jobs=[];
    /*sass 不支持glob...*/
    function makeSass(siteName){
        jobs.push(sass("./src/"+siteName+"/style/scss/", {
            sourcemap: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write("./map/"+siteName+"", {
            sourceMappingURLPrefix: configjson.sourceUrl + siteName+"/style/"

        }))
        .pipe(gulp.dest("./src/"+siteName+"/style/")));
    }
    if(fs.existsSync("./src/wap/style/scss/")){
        makeSass("wap");
    }
    if(fs.existsSync("./src/web/style/scss/")){
        makeSass("web");
    }
    return merge.apply(null,jobs);
});
