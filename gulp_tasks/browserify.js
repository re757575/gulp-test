// Browserify Task
'use strict';
var gulp = require("gulp"),
    _browserify = require("browserify"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

function browserify() {

    var b = _browserify({
        entries: "./public/dist/js/main.min.js",
        debug: true
    });

    return b.bundle()
            .pipe(source("bundle.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("./public/dist/js/"));

}

gulp.task('browserify', browserify);

module.exports = browserify;
