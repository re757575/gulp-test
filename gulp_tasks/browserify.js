// Browserify Task
'use strict';
var gulp = require("gulp"),
    _browserify = require("browserify"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify');

function browserify() {

    var b = _browserify({
        entries: "./public/dist/js/main.js",
        debug: true
    });

    return b.bundle()
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(
                uglify({
                  output: {
                    ascii_only: true
                  },
                  compress: {
                    drop_console: true
                }
                })
            )
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("./public/dist/js/"));

}

gulp.task('browserify', browserify);

module.exports = browserify;
