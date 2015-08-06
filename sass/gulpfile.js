var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
gulp.task('sass', function () {
  return sass('./src/',{sourcemap: true})
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write("./map/"))
    .pipe(gulp.dest('./dest/'))
    .pipe(livereload());
});

gulp.task('sass:watch', function () {
    livereload.listen();
  return gulp.watch('./**/*.scss', ['sass']);
});
gulp.task("default",["sass","sass:watch"]);

