//  pre-commit js lint Task
var gulp = require('gulp'),
    jshint = require('gulp-jshint');

function lint() {
  return gulp.src([
      './lib/*.js'
  ])
    .pipe(jshint('./lib/.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
}

gulp.task('lint', lint);

module.exports = lint;
