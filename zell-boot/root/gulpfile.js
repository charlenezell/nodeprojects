var gulp = require('gulp');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

var gulpif = require('gulp-if');
var concat = require("gulp-concat");
var cssmin = require('gulp-minify-css');
var htmlmin = require("gulp-minify-html");
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var stylish = require('jshint-stylish');
var sp = require("gulp.spritesmith/");
var imagemin = require("gulp-imagemin");
var p = require("path");
var pngmin = require('gulp-pngmin');
var merge = require("merge-stream");
var es = require("event-stream");
var glob = require("glob");
var streamqueue = require('streamqueue');
var del = require("del");
var ld = require("lodash/");
var fs = require("fs");
var rev = require("gulp-rev");
var useref = require('gulp-useref');
var replace = require("zell-grr");
var os = require("os");
gulp.task("clean", function(cb) {
    del("dest/", cb);
});


gulp.task("css", ["sprite"], function() {
    var g = btnsHtmlArray.map(function(v) {
        return "<a class='actcommonbtns icon-" + v + "' href='###'></a>" + os.EOL;
    }).join("");
    fs.writeFileSync("btns.html", g);
    return gulp.src("src/**/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin({
                compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
           }))
        .pipe(gulp.dest("dest/"));
});
gulp.task("js", ["clean"], function() {
    return gulp.src("src/**/*.js")
        .pipe(jshint())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest("dest/"));
});
gulp.task("html", ["clean", "js", "css"], function() {
    var assets1 = useref.assets({
        searchPath: "./dest/web/"
    });
    var assets2 = useref.assets({
        searchPath: "./dest/wap/"
    });
    return merge(
        gulp.src("src/wap/*.html").pipe(assets2).pipe(gulp.dest("dest/wap/"))
        .pipe(gulp.dest("dest/wap/")).pipe(assets2.restore()).pipe(useref()).pipe(htmlmin({
            conditionals: true,
            quotes: false
        })).pipe(gulp.dest("dest/wap/")),
        gulp.src("src/web/*.html").pipe(assets1).pipe(gulp.dest("dest/web/"))
        .pipe(gulp.dest("dest/web/")).pipe(assets1.restore()).pipe(useref()).pipe(htmlmin({
            conditionals: true,
            quotes: false
        })).pipe(gulp.dest("dest/web/")),
        gulp.src("src/*.html").pipe(htmlmin({
            conditionals: true,
            quotes: false
        })).pipe(gulp.dest("dest/"))
    );
});
var btnsHtmlArray = [];
gulp.task("sprite", ["clean"], function() {
    var subSites = ld.compact(glob.sync("src/*").map(function(v) {
        if (fs.statSync(v).isDirectory()) {
            return v;
        } else {
            return false;
        }
    }));
    var jobs = [];
    var cssBundles = {};
    btnsHtmlArray = [];
    subSites.forEach(function(v) {
        cssBundles[v] = [];
        var _map = glob.sync(v + "/**/img/sprite/*").map(function(a) {
            function getRealName(w) {
                var a = w.split("/").pop();
                var realName = a.split("_").pop() + ".png";
                return realName;
            }

            function getParamList(_a) {
                /*p8,v,h,s  默认用_分割，潜规则是图片命名不能有_*/
                var a = p.basename(_a);
                var arg = a.split("_");
                arg.pop();
                return arg;
            }
            var imgName = getRealName(a),
                cssName = p.basename(a) + ".scss";
            // console.log("what is a?",a,imgName);
            var d = gulp.src(a + "**/*.{jpg,png}").pipe(sp({
                imgName: imgName,
                cssName: cssName,
                imgPath: "img/sprite/" + imgName,
                algorithm: ld.contains(getParamList(a.split("/").pop()), "h") ? "left-right" : ld.contains(getParamList(a.split("/").pop()), "v") ? "top-down" : ld.contains(getParamList(a.split("/").pop()), "s") ? "diagonal" : "binary-tree",
                cssVarMap: function(sp) {
                    var name = p.basename(p.resolve(sp.source_image, "..")).split("_").pop();
                    sp.name = name + "_" + sp.name;
                    btnsHtmlArray.push(sp.name);
                },
                cssTemplate:"sptemplate.hb"
            }));

            var _basePath = a.split("/");
            _basePath.shift();
            _basePath.pop();
            cssBundles[v].extraData = {
                basePath: _basePath.join("/")
            };
            cssBundles[v].push(d.css);
            // console.log("hello",_basePath.join("/"))
            return (ld.contains(getParamList(a), "p8") ? d.img.pipe(pngmin()) : d.img.pipe(imagemin({
                optimizationLevel: 0
            }))).pipe(gulp.dest("dest/" + _basePath.join("/")));
        });
        var imgJob = es.concat.apply(null, _map);
        if (_map.length > 0) {
            jobs.push(imgJob);
        }
        // console.log(cssBundles[v])
        // console.log("whatisv->%s", v);
        var cssJob = streamqueue.apply(null, [{
            objectMode: true
        }].concat(cssBundles[v])).pipe(concat("sprite.scss")).pipe(cssmin({
            compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
        }));
        if (cssBundles[v].extraData && cssBundles[v].extraData.basePath) {
            cssJob.pipe(gulp.dest(p.resolve("dest/" + cssBundles[v].extraData.basePath, "../../")));
            jobs.push(cssJob);
        }
    });
    if (jobs.length > 0) {
        return merge.apply(this, jobs);
    }
});
gulp.task("resource", ["clean"], function() {
    return merge(gulp.src(["src/**/*.{mp3,jpg,png,swf,gif,mp4,flv}", "!src/**/img/sprite/**/*", "!src/**/img/bg/**/*"]).pipe(gulp.dest("dest/")),
        gulp.src("src/**/img/bg/**/*").pipe(imagemin({
            progressive: true,
            optimizationLevel: 0
        })).pipe(gulp.dest("dest/")));
});

gulp.task("build", ["clean", "css", "js", "html", "resource", "sprite"]);
// gulp.task("build", ["clean", "js", "html", "resource"]);
gulp.task("makerevfile", ["build"], function() {
    /*make rev configFile*/
    return gulp.src("dest/**/*.{css,js,png,jpg,swf,mp4,mp3,flv}").pipe(rev()).pipe(rev.manifest()).pipe(gulp.dest("./"));
        // return gulp.src("dest/**/*.html").pipe()
});
gulp.task("rev", ["makerevfile"], function() {
    var mani = gulp.src("rev-manifest.json");
    return gulp.src("dest/**/*.{html,css,js}")
        .pipe(replace({
            manifest: mani,
            modifyUnreved: function(name, base) {
                var a = p.relative(p.dirname(base), p.resolve("dest", name));
                a = a.replace(/\\/g, "/");
                return a;
            },
            modifyReved: function(name, unrevName, base) {
                var rev = p.basename(name).split("-").pop().split(".")[0];
                var a = p.relative(p.dirname(base), p.resolve("dest", unrevName)) + "?" + rev;
                a = a.replace(/\\/g, "/");
                return a;
            }
        }))
        .pipe(gulp.dest("dest/"));
});
gulp.task("deploy", ["rev"], function() {
    var targetPath="c:/defaultZbootDeploypath/";
    if(fs.existsSync("env.json")){
        try{
            targetPath=JSON.parse(fs.readFileSync("env.json").toString()).deployPath;
        }catch(e){
            throw new Error("请检查env.json是否为合法的json格式");
        }
    }

    return gulp.src(["dest/**/*"]).pipe(gulp.dest(targetPath)).pipe(gulp.dest("./"));
});


gulp.task('watch', function() {
    return gulp.watch(['./src/**/*.{jpg,png,js,coffee,less,css,gif,html,scss}'], ['deploy']);
});

gulp.task("default", ["watch", "deploy"]);
