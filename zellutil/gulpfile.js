const gulp = require('gulp');
const babel = require('gulp-babel');
gulp.task('watchSrcESs', function() {
  gulp.watch(['./src/**/*.es'], ['default']);
});
gulp.task('build', () => {
  return gulp.src('src/**/*.es')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./'));
})
gulp.task('default', ["build", "watchSrcESs"]);
