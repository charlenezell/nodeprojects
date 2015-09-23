'use strict'
var DEBUG=true;
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    wrap = require("gulp-wrap"),
    runSequence = require('run-sequence'),
    mkdirp=require("mkdirp"),
    gulpif = require('gulp-if'),
    concat = require("gulp-concat"),
    cssmin = require('gulp-minify-css'),
    htmlmin = require("gulp-minify-html"),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    stylish = require('jshint-stylish'),
    sp = require("gulp.spritesmith/"),
    mapStream = require('map-stream'),
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



gulp.task("default",function(cb){
  runSequence("build","watchConfig","watchResource","watchSrcCode",cb);
});

gulp.task("watchConfig",function(){
    return gulp.watch("./env.json",["reloadConfig"]);
});
gulp.task("reloadConfig",function(cb){
    try {
    configjson = JSON.parse(fs.readFileSync("env.json").toString());
    console.log("env.json Reloaded");
    } catch (e) {
        throw e;
    }
    runSequence("deploySrcCode",cb);
});
gulp.task("transferMultimedias",function(){
    var bgGlob=path.join(configjson.resourcePath,"/**/resource/**/*.{jpg,png,gif,mp4,mp3,mov,flv}");
    /*直接拷贝*/
    return gulp.src(bgGlob).pipe(gulp.dest("./dest/"));
});
gulp.task("build",function(cb){
  runSequence(["sprite","optimizeBackgroundImage","transferMultimedias"],"deploySrcCode",cb);
});
gulp.task("watchResource",function(){
    return gulp.watch(path.join(configjson.resourcePath,"**/*.{jpg,png}"),["build"]);
});
gulp.task("watchSrcCode",function(){
    return gulp.watch([path.join(__dirname,"/src/**/*.{html,js,css,scss}"),"!"+path.join(__dirname,"/src/**/sprite.scss")],["deploySrcCode"]);
});

gulp.task("deploySrcCode",["rev"],function(cb){
        return gulp.src("./dest/**/*").pipe(gulp.dest("./")).pipe(gulp.dest(configjson.deployPath));
    });
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
                /*v,h,s  默认用_分割，潜规则是图片命名不能有_*/
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
                imgName2=ld.contains(getParamList(a), "jpeg")?imgName.replace(path.extname(imgName),".jpeg"):imgName;
                cssName = path.basename(a) + ".scss",
                allImgGlob=path.join(a,"**/*.{jpg,png}");
                console.log(imgName,cssName);

            var spMixStream = gulp.src(allImgGlob).pipe(sp({
                imgName:imgName2,
                cssName: cssName,
                engine:"gmsmith",
                imgPath: "img/sprite/" + imgName2,
                algorithm: chooseAlgorithm(a),
                imgOpts: {quality: 100},
                cssVarMap: function(sp) {
                    var spriteImgName = getRealName(a);
                    sp.name = spriteImgName.replace(path.extname(spriteImgName),"")
                     + "_" + sp.name;
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
            var hasOptimised=ld.contains(getParamList(a), "jpeg");
            if (needP8Renderer) {
               return spMixStream.img.pipe(pngmin()).pipe(gulp.dest("./dest/" + _basePath));
            } else if(hasOptimised){
               return spMixStream.img.pipe(gulp.dest("./dest/" + _basePath));
            }else{
               return spMixStream.img.pipe(imagemin({
                   optimizationLevel: 3
               })).pipe(gulp.dest("./dest/" + _basePath));
            }
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
        return es.concat.apply(this, jobs);
    }
});
gulp.task("optimizeBackgroundImage",function(){
    var bgGlob=path.join(configjson.resourcePath,"/**/img/bg/**/*.{jpg,png}");
    return gulp.src(bgGlob).pipe(imagemin({
        progressive: true,
        optimizationLevel: 3
    })).pipe(gulp.dest("./dest/"));
});
gulp.task("rev",["makeRevMap"],function(){
    var mani = gulp.src("./rev-manifest.json");
    return gulp.src("./dest/**/*.{html,css,js}")
        .pipe(replace({
            manifest: mani,
            modifyUnreved: function(name, base) {
                // console.log(2,name,base)
                var a = path.relative(path.dirname(base), path.resolve("dest", name));
                a = a.replace(/\\/g, "/");
                return a;
            },
            modifyReved: function(name, unrevName, base) {
                // console.log(1,name,unrevName,base)
                var rev = path.basename(name).split("-").pop().split(".")[0];
                var a = path.relative(path.dirname(base), path.resolve("dest", unrevName)) + "?" + rev;
                a = a.replace(/\\/g, "/");
                return a;
            }
        }))
        .pipe(gulp.dest("./dest/"));
});
gulp.task("makeRevMap",["html"],function(){
    return gulp.src("dest/**/*.{html,css,js,png,jpg,swf,mp4,mp3,flv,gif}")
                .pipe(rev())
                .pipe(rev.manifest())
                .pipe(gulp.dest("./"));
});
gulp.task("html",["javascript","css"],function(){
    var assets1 = useref.assets({
        searchPath: "./dest/web/"
    });
    var assets2 = useref.assets({
        searchPath: "./dest/wap/"
    });
    /*makeBundleJSs/CSSs*/
    return merge(
        gulp.src("./src/wap/*.html")
        .pipe(assets2)
        .pipe(gulp.dest("./dest/wap/"))
        .pipe(assets2.restore())
        .pipe(useref())
        .pipe(mapStream(ldTemplate))
        .pipe(htmlmin({
            conditionals: true,
            quotes: true
        }))
        .pipe(gulp.dest("./dest/wap/")),
        gulp.src("./src/web/*.html")
        .pipe(assets1)
        .pipe(gulp.dest("./dest/web/"))
        .pipe(assets1.restore())
        .pipe(useref())
        .pipe(mapStream(ldTemplate))
        .pipe(htmlmin({
            conditionals: true,
            quotes: true
        }))
        .pipe(gulp.dest("./dest/web/")),
        gulp.src("./src/*.html")
        .pipe(mapStream(ldTemplate))
        .pipe(htmlmin({
            conditionals: true,
            quotes: true
        }))
        .pipe(gulp.dest("./dest/"))
    );
});
gulp.task("javascript",function(){
    return gulp.src("src/**/*.js")
        .pipe(sourcemaps.init())
        // .pipe(jshint())
        // .pipe(jshint.reporter(stylish))
        .pipe(babel())
        .pipe(uglify({
            warnings:false,
            output:{
                ascii_only:true,
                comments:/author|copyright|license/,
            },compress:{
                global_defs:{
                    DEBUG:DEBUG
                }
            }
        }))
        .pipe(sourcemaps.write("./map/"))
        .pipe(gulp.dest("dest/"));
});
gulp.task("css",["sass"],function(){
    return gulp.src("src/**/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin({
                compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
           }))
        .pipe(gulp.dest("dest/"));
});
gulp.task("sass",function() {
    var jobs=[];
    /*sass 不支持glob...*/
    function makeSass(siteName){
        jobs.push(sass("./src/"+siteName+"/style/scss/", {
            sourcemap: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(autoprefixer())
        .pipe(cssmin({
                compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
           }))
        .pipe(sourcemaps.write("./map/"+siteName+"", {
            sourceMappingURLPrefix: configjson.sourceUrl + siteName+"/style/"
        }))
        .pipe(gulp.dest("./dest/"+siteName+"/style/")));
    }
    if(fs.existsSync("./src/wap/style/scss/")){
        makeSass("wap");
    }
    if(fs.existsSync("./src/web/style/scss/")){
        makeSass("web");
    }
    return merge.apply(null,jobs);
});

function ldTemplate(file, cb) {
    var content = file.contents;
    try {
        var compiled = ld.template(content);
        file.contents = new Buffer(compiled(configjson));
        cb(null, file);
    } catch (e) {
        console.log(e);
    }
}
