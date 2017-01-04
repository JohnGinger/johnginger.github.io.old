// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('scss', function () {
 gulp.src('scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./output/css/'))
});

var browserify = require('browserify');
var babelify = require('babelify');
var minifyify = require('minifyify');
var gutil = require('gulp-util');
var fs = require('fs');

var browserified = function (filename) {
    var b = browserify({ debug: true, cache: {}, packageCache: {} });
    var fileEnd = filename.split('/').slice(-1)[0];
    b.add(filename);
    b.transform("babelify", { presets: ["es2015"] });

    //b.plugin('minifyify', { map: fileEnd + '.map', output: "./output/js/" + fileEnd + ".map" });
    b.transform('brfs');
    b.plugin(watchify);
    b.on('update', function (ids) { bundle(filename, ids) });
    bundle(filename);

    function bundle(filename, ids) {
        console.log("Updating " + filename + "(" + ids + " changed)")
        myFile = fs.createWriteStream('./output/js/' + filename.split('/').slice(-1)[0])
         b.bundle().on('error', function (error) {
            console.log(error);
            this.emit('end');
        }).pipe(myFile);
    }


};

var watchify = require("watchify");

gulp.task('browserify', function () {
    browserified('./scripts/index.js');
});


gulp.task('default', ['scss', 'browserify'], function () {
    gulp.watch('scss/*.scss', ['scss']);
})
