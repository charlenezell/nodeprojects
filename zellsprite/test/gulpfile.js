'use strict';

var _index = require('../index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var runSequence = require('run-sequence');
(0, _index2.default)(gulp, { src: "./imgSrc", dest: "./imgDest", templateFile: "./css.hb" });
gulp.task("default", ["build", "watch"]);
gulp.task("watch", function () {
  return gulp.watch("./*.scss", ["sass"]);
});
gulp.task("build", function (done) {
  runSequence("sprite", "sass", done);
});
gulp.task("sass", function () {
  return sass(["./*.scss"], {
    sourcemap: false,
    loadPath: ["E:/projectA/source/web/resource/marketnew/common/src/scss/common"]
  })
  //.pipe(sourcemaps.write())
  .pipe(gulp.dest("./"));
});