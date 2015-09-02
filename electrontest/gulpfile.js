var gulp = require('gulp');
var electronInstaller = require('electron-installer');

gulp.task('default', function(done) {
  electronInstaller({
    appDirectory: './dist/win/testestest-win32',
    outputDirectory: './release',
    exe: 'app.exe',
	authors:["sdf"]
  }).then(done).catch(done);
});