// Default Task
var gulp = require('gulp'),
    runSequence = require('run-sequence');

function defaultTask(cb) {
    // gulp.start( ['cleanJS', 'scripts', 'browserify']); // 執行順序依照陣列排列順序

    runSequence(
      'cleanJS',
        [
            'scripts',
            'browserify',
            'watch'
        ],
      cb);
}

gulp.task('default', defaultTask);
