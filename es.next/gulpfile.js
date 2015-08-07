var gulp=require("gulp");
var traceur=require("gulp-traceur");
var babel=require("gulp-babel");
var mocha=require("gulp-mocha");
var changed=require("gulp-changed");
require('traceur/bin/traceur-runtime');
gulp.task("default",["runTest","watchTest","watchSrcCode"]);
gulp.task("watchTest",function(){
	return gulp.watch("./test/*.js",["runTest"]);
});
gulp.task("watchSrcCode",function(){
	return gulp.watch("./src/*.js",["compile1","compile2"]);
});
gulp.task("runTest",["compile1","compile2"],function(cb){
	return gulp.src("./test/*.js").pipe(mocha({reporter:'nyan'}));
});
gulp.task("compile1",function  () {
	return gulp.src(["./src/*.js"]).pipe(changed("./dest/",{
		hasChanged:changed.compareSha1Digest
	})).pipe(traceur()).pipe(gulp.dest("./dest/traceur/"));
});
gulp.task("compile2",function  () {
	return gulp.src(["./src/*.js"]).pipe(changed("./dest/",{
		hasChanged:changed.compareSha1Digest
	})).pipe(babel()).pipe(gulp.dest("./dest/babel/"));
});
