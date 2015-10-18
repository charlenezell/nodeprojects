var gulp=require("gulp");
var babel=require("gulp-babel");
var autoprefixer=require("gulp-autoprefixer");
var sass = require('gulp-ruby-sass');

gulp.task("sass",function(){
	return sass("./scss/**/*.scss").on('error', function(err) {
            console.error('Error!', err.message);
        }).pipe(autoprefixer()).pipe(gulp.dest("./dist/"));
});
gulp.task("babel",function(){
	return gulp.src("./es/**/*.es").pipe(babel()).pipe(gulp.dest("./dist/"));
});
gulp.task("watch",function(){
	return gulp.watch(["./es/**/*.es","./scss/**/*.scss"],["sass","babel"])
});
gulp.task("default",["sass","babel","watch"]);
