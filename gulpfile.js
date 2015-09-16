var gulp = require('gulp'),
    concat = require('gulp-concat'),
    // jshint = require('gulp-jshint'),
    clean = require('gulp-clean'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();


// jshint 錯誤處裡
function handleError (err) {
  console.log(err.toString());
  // 終止程序
  process.exit(-1);
}

// Scripts Task
gulp.task('scripts', function() {

    // 讀取 路徑下所有的 js 檔案
    gulp.src('./lib/*.js')

        // 檢查 JS 檔案語法
        .pipe($.jshint('./lib/.jshintrc'))
        // .pipe(jshint.reporter('default'))

        // jshint 回報格式 美化
        .pipe($.jshint.reporter('jshint-stylish'))

        .pipe($.jshint.reporter('fail'))

        // 當驗證有發現錯誤則執行 handleError
        .on('error', handleError)

        // 將 js 檔案合併成 main.js, 分隔為換行
        .pipe(concat('main.js', {newLine: '\n'}))

        // 存放 main.js 至 dist 目錄
        .pipe(gulp.dest('./dist/'))

        // 複製 main.js 並檔名修改成 main.min.js
        .pipe(rename({ suffix: '.min' }))

        // js最小化
        .pipe(uglify())

        // 存放 main.min.js 至 dist 目錄
        .pipe(gulp.dest('./dist/'))

        // 通知 Scripts Task 已完成
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean Task
gulp.task('clean', function() {

    // 刪除 路徑下所有 js 檔案

    gulp.src(['./dist/*.js'], {
      read: false // 不讀取檔案(return file.contents as null and not read the file)
    })
    .pipe(clean());
});

// Start Web Server Task
gulp.task('serve', function() {
  gulp.src('public')
      .pipe($.webserver({
          livereload: true,
          open: true
      }));
});

// Watch Task
gulp.task('watch', function() {

    // 啟動 Web Server
    gulp.start('serve');

    // 監看 lib 目錄下的所有 js 檔案
    gulp.watch('./lib/*.js', ['scripts']);
});

// Default Task

// gulp.task('default', ['scripts']);
// gulp.task('default', ['clean', 'scripts']); // 執行順序依照陣列排列順序

// 使用 callback, 先執行 clean 在執行 scripts
// gulp.task('default', ['clean'], function() {
//     gulp.start('scripts');
// });

gulp.task('default', function(cb) {
  runSequence(
    'clean',
    [
      'scripts',
      'watch'
    ],
    cb);
});