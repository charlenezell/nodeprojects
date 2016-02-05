import spriteTask from "../index.js" ;

const gulp = require('gulp');
const sass = require('gulp-ruby-sass');
const runSequence = require('run-sequence');
spriteTask(gulp,{src:"./imgSrc",dest:"./imgDest",templateFile:"./css.hb"});
gulp.task("default",["build","watch"]);
gulp.task("watch",function(){
  return gulp.watch("./*.scss",["sass"]);
});
gulp.task("build",function(done){
  runSequence("sprite","sass",done);
});
gulp.task("sass", function() {
  return sass(["./*.scss"],{
      sourcemap: false,
      loadPath: ["E:/projectA/source/web/resource/marketnew/common/src/scss/common"]
    })
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest("./"))
});
