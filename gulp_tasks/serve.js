// Serve Task
var gulp = require('gulp'),
    webserver = require('gulp-webserver');

function serve() {
    gulp.src('public')
      .pipe(webserver({
          livereload: true,
          open: true
      }));
}

gulp.task('serve', serve);

module.exports = serve;
