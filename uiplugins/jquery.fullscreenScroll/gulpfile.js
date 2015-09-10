const DEBUG = false;
var gulp = require("gulp");
var uglify = require("gulp-uglify");
var hint = require("gulp-jshint");
var del = require("del");
var stylish = require('jshint-stylish');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
gulp.task("default", ["jsmin", "watchjs"]);
gulp.task("deploy",function(){
  gulp.src(["./**/*","!./node_modules/**/*"]).pipe(gulp.dest("E:/projectA/source/web/resource/resource/js/plugins/jquery.fullscreenScroll/"));
});
gulp.task("jsmin", ["cleanjs"], function() {
  return gulp.src("./src/*.js")
    .pipe(sourcemaps.init())
    // .pipe(hint())
    // .pipe(hint.reporter(stylish))
    .pipe(babel())
    .pipe(uglify({
      warnings: false,
      output: {
        ascii_only:true,
        comments: /author|copyright|license/
      },
      compress: {
        global_defs: {
          DEBUG: DEBUG
        }
      }
    }))
    .pipe(sourcemaps.write("../map/"))
    .pipe(gulp.dest("./dist/"))
});
gulp.task("watchjs", function() {
  return gulp.watch(["./src/*.js"], ["jsmin"]);
});
gulp.task("cleanjs", function(cb) {
  del(["./dist/*", "./map/*"]).then(function(paths) {
    gutil.log(gutil.colors.cyan("deleted files/folders:\n"), gutil.colors.magenta(paths.map(function(v) {
      return "###" + v
    }).join("\n")));
    cb();
  });
});
