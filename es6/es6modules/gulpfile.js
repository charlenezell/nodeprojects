var gulp=require("gulp");
var babel=require("gulp-babel");
var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var concat = require('gulp-concat');
gulp.task("default",["compile","watch"]);
gulp.task("compile",function(){
    // return gulp.src([traceur.RUNTIME_PATH,"./src/*.js"])
    return gulp.src(["./src/*.js"])
    .pipe(sourcemaps.init())
    .pipe(babel({modules:"amd"}))
    // .pipe(traceur({modules:'amd',experimental:true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("./dest/")).pipe(gulp.dest("D:/home/site/web/resource/js/lib/es6test/"));
});
gulp.task("watch",function(){
    return gulp.watch(["./src/index.js"],["compile"]);
})
