var gulp=require("gulp");
var babel=require("gulp-babel");
var autoprefixer=require("gulp-autoprefixer");
var sass = require('gulp-ruby-sass');
var cssmin = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var del = require('del');
var merge = require("merge-stream");

var srcPath = "./src/";
var destPath="./dest/"
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

gulp.task("resource",function(){
  return gulp.src([srcPath+"**/*.{png,jpg,html,mp3,mp4,gif,flv,swf}"]).pipe(gulp.dest(destPath));
});

gulp.task("watch",function(){
	return gulp.watch([srcPath+"**/*.{css,js,scss,es}"],["css","js","babel","sass"])
});

gulp.task("default",["build","watch"]);
gulp.task("build",["sass","babel","resource","js","css"]);
