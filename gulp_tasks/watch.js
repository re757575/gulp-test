// Watch Task
var gulp = require('gulp');

function watch() {

    // 啟動 Web Server
    gulp.start('serve');

    // 監看 lib 目錄下的所有 js 檔案
    gulp.watch('./lib/*.js', ['scripts', 'browserify']);
}

gulp.task('watch', watch);

module.exports = watch;
