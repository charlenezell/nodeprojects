var gulp=require("gulp");
var babel=require("gulp-babel");
var autoprefixer=require("gulp-autoprefixer");
var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var merge = require("merge-stream");
var rev = require("gulp-rev");
var replace = require("zell-grr");
var runSequence = require('run-sequence');
var srcPath = "./src/";
var destPath="./dest/"
var path=require("path")
var DEBUG=false;

del.sync(destPath+"*");

gulp.task("sass", function() {
  return sass([srcPath + "**/*.scss"]).on('error', function(err) {
    console.error('Error!', err.message);
  })
  .pipe(autoprefixer())
  .pipe(cssmin({
         compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
       }))
  .pipe(gulp.dest(destPath));
});

gulp.task("css",function(){
  return gulp.src(srcPath + "**/*.css")
  .pipe(autoprefixer())
  .pipe(cssmin({
         compatibility: "ie6,ie7,ie8,+selectors.ie7Hack,+properties.iePrefixHack"
       }))
  .pipe(gulp.dest(destPath));
});

gulp.task("js", function() {
  return gulp.src(srcPath + "**/*.js")
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
    .pipe(gulp.dest(destPath));
});

gulp.task("babel", function() {
  return gulp.src(srcPath + "**/*.es")
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
    .pipe(gulp.dest(destPath));
});

gulp.task("rev",["makeRevMap"],function(){
    var mani = gulp.src("./rev-manifest.json");
    return gulp.src(destPath+"/**/*.css")
        .pipe(replace({
            manifest: mani,
            modifyUnreved: function(name, base) {
                // console.log(2,name,base)
                var a = path.relative(path.dirname(base), path.resolve(destPath, name));
                a = a.replace(/\\/g, "/");
                return a;
            },
            modifyReved: function(name, unrevName, base) {
                // console.log(1,name,unrevName,base)
                var rev = path.basename(name).split("-").pop().split(".")[0];
                var a = path.relative(path.dirname(base), path.resolve(destPath, unrevName)) + "?" + rev;
                a = a.replace(/\\/g, "/");
                return a;
            }
        }))
        .pipe(gulp.dest(destPath));
});

gulp.task("makeRevMap",function(){
    return gulp.src(destPath+"/**/*.{html,css,js,png,jpg,swf,mp4,mp3,flv,gif}")
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest("./"));
});

gulp.task("resource",function(){
  return gulp.src([srcPath+"**/*.{png,jpg,html,mp3,mp4,gif,flv,swf}"]).pipe(gulp.dest(destPath));
});

gulp.task("watch",function(){
	return gulp.watch([srcPath+"**/*.{css,js,scss,es}"],["build"])
});

gulp.task("default",function(cb){
  runSequence("build","watch",cb);
});

gulp.task("build",function(cb){
  runSequence(["sass","babel","resource","js","css"],"rev",cb);
});

