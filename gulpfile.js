var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin=require('gulp-imagemin');
//var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var watch = require('gulp-watch');
var sftp = require('gulp-sftp');
var runSequence=require('gulp-run-sequence');
var jsSrcPath='./public/webapp/srcYlc/js/*.js';
var sassSrcPath='./public/webapp/srcYlc/scss/*.scss';
var cssSrcPath='./public/webapp/srcYlc/css/*.css';
var imgSrcPath='./public/webapp/srcYlc/images/**/*.+(jpeg|jpg|png|gif)';
var imgDistPath='./public/webapp/ylc/images';
var cssDistPath='./public/webapp/ylc/css';
var jsDistPath='./public/webapp/ylc/js';
gulp.task('minJs',function () {
    gulp.src(jsSrcPath)
        .pipe(uglify())
        .pipe(gulp.dest(jsDistPath));
});

gulp.task('minCss',function () {
    gulp.src(cssSrcPath)
        .pipe(cssnano())
        .pipe(gulp.dest(cssDistPath));
});

gulp.task('minImage',function () {
    gulp.src(imgSrcPath)
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive:true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest(imgDistPath));
});

gulp.task('sass',function () {
        sass(sassSrcPath)
        .on('error',sass.logError)
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        /*.pipe(sftp({
           host: '115.28.63.41',
           user: 'kuangyeheng',
           pass: '37400745',
           port: "22",
           remotePath: '/home/kuangyeheng/oneMall/webroot/public/webapp/ylc/css/'
        }))*/
        .pipe(gulp.dest(cssDistPath));
});

gulp.task('build', function (done) {
    runSequence(
        ['sass'],
        ['minCss'],
        ['minJs'],
        ['minImage'],
        done) ;
});

gulp.task('default',function (done) {
    runSequence(
        ['build'],
        ['watch']
    ,done);
});

gulp.task('watch' ,function() {
    gulp.watch(sassSrcPath,['sass','minCss']);
    gulp.watch(cssSrcPath,['minCss']);
    gulp.watch(jsSrcPath,['minJs']);
    gulp.watch(imgSrcPath,['minImage']);
});
// gulp.task('default',['build']);