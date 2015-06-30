var gulp = require('gulp');
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

gulp.task("clean", function(cb) {
    del("dest/**/*", cb);
});
gulp.task("css", ["sprite"], function() {
    return gulp.src("src/**/*.css")
        .pipe(autoprefixer())
        .pipe(cssmin({
            compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
        }))
        .pipe(gulp.dest("dest/"));
});
gulp.task("concatCSS", ["css"], function() {
    return gulp.src("dest/style/*.css").pipe(concat("concat.css")).pipe(gulp.dest("dest/style/"))
});
gulp.task("js", ["clean"], function() {
    return gulp.src("src/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest("dest/"));
});
gulp.task("html", ["clean"], function() {
    return gulp.src("src/*.html").pipe(htmlmin()).pipe(gulp.dest("dest/")).pipe(gulp.dest("../"));
});
gulp.task("sprite", ["clean"], function() {
    glob.sync("src")
    return merge(es.concat.apply(null, glob.sync("src/**/img/sprite/*").map(function(a) {
            var d = gulp.src(a + "**/*.{jpg,png}").pipe(sp({
                imgName: p.basename(a).replace(/p8_/, "") + ".png",
                cssName: p.basename(a) + ".css",
                imgPath: "img/" + p.basename(a).replace(/p8_/, "") + ".png",
                cssVarMap: function(sp) {
                    sp.name = p.basename(p.resolve(sp.source_image, "..")).replace(/p8_/, "") + "_" + sp.name;
                }
            }));
            conCss.push(d.css);
            var _basePath = a.split("/");
            _basePath.shift();
            _basePath.pop();
            return (/p8_/.test(a) ? d.img.pipe(pngmin()) : d.img.pipe(imagemin({
                optimizationLevel: 5
            }))).pipe(gulp.dest("dest/" + _basePath.join("/")));
        })),
        streamqueue.apply(null, [{
            objectMode: true
        }].concat(conCss)).pipe(concat("sprite.css")).pipe(cssmin({
            compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
        })).pipe(gulp.dest("dest/" + _basePath.join("/")))
    )
});
gulp.task("resource", ["clean"], function() {
    return gulp.src(["src/**/*.{mp3,jpg,png,swf,gif}", "!src/**/img/sprite/**/*"]).pipe(gulp.dest("dest/"));
});

gulp.task("build", ["clean", "css", "js", "html", "resource", "sprite", "concatCSS"]);

gulp.task("deploy", ["build"], function() {
    return merge(gulp.src(["dest/**/*"]).pipe(gulp.dest("D:/home/site/web/lds/gwActivity/20150719/dest/")));
});

gulp.task('watch', ["deploy"], function() {
    return gulp.watch(['./src/**/*.{jpg,png,js,coffee,less,css,gif}', 'src/*.html'], ['deploy']);
});

gulp.task("default", ["watch", "deploy"]);
