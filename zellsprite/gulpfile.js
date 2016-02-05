const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task("watch",() => {
  gulp.watch("./**/*.es6",["build"])
});
gulp.task("build",() => {
    return gulp.src('./**/*.es6')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('.'));
  });
gulp.task('default',["watch","build"]);

