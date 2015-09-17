// CleanJS Task
var gulp = require('gulp'),
    clean = require('gulp-clean');

function cleanJS() {

    // 刪除 路徑下所有 js 檔案
    gulp.src(['./dist/*.js'], {
      read: false // 不讀取檔案(return file.contents as null and not read the file)
    })
    .pipe(clean());
}

gulp.task('cleanJS', cleanJS);

module.exports = cleanJS;
