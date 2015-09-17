// Default Task
var gulp = require('gulp'),
    runSequence = require('run-sequence');

function defaultTask(cb) {
    // gulp.start( ['cleanJS', 'scripts']); // 執行順序依照陣列排列順序

    runSequence(
      'cleanJS',
        [
            'scripts',
            'watch'
        ],
      cb);
}

gulp.task('default', defaultTask);
