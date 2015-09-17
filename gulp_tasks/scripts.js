// Scripts Task
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

// jshint 錯誤處裡
function handleError (err) {
  console.log(err.toString());
  // 終止程序
  process.exit(-1);
}

function scripts() {

    // 讀取 路徑下所有的 js 檔案
    return gulp.src('./lib/*.js')

        // 檢查 JS 檔案語法
        .pipe(jshint('./lib/.jshintrc'))
        // .pipe(jshint.reporter('default'))

        // jshint 回報格式 美化
        .pipe(jshint.reporter('jshint-stylish'))

        .pipe(jshint.reporter('fail'))

        // 當驗證有發現錯誤則執行 handleError
        .on('error', handleError)

        // 將 js 檔案合併成 main.js, 分隔為換行
        .pipe(concat('main.js', {newLine: '\n'}))

        // 存放 main.js 至 dist 目錄
        .pipe(gulp.dest('./dist/'))

        // 複製 main.js 並檔名修改成 main.min.js
        .pipe(rename({ suffix: '.min' }))

        // js最小化
        .pipe(
            uglify({
              output: {
                ascii_only: true
              },
              compress: {
                drop_console: true
            }})
        )

        // 存放 main.min.js 至 dist 目錄
        .pipe(gulp.dest('./dist/'))

        // 通知 Scripts Task 已完成
        .pipe(notify({ message: 'Scripts task complete' }));
}

gulp.task('scripts', scripts);

module.exports = scripts;
