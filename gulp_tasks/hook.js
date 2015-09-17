// Hook Task
var gulp = require('gulp'),
    symlink = require('gulp-symlink');

function hook() {
  return gulp.src(['.pre-commit'])
             .pipe(symlink(function() {
                    return new symlink.File({
                        cwd: process.cwd(),
                        path: '.git/hooks/pre-commit'
                    });
                }, {force: true}
            ));
}

gulp.task('hook', hook);

module.exports = hook;
