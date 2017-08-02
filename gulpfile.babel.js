'use strict';

import gulp from 'gulp';
import uglify from'gulp-uglify';
import concat from'gulp-concat';
import sass from'gulp-sass';
import rename from'gulp-rename';
import autoprefixer from'gulp-autoprefixer';
import cleanCSS from'gulp-clean-css';
import path from'path';
import browsersync from'browser-sync';
import bourbon from'node-bourbon';
import svgmin from'gulp-svgmin';
import svgstore from'gulp-svgstore';
import plumber from'gulp-plumber';
import gutil from'gulp-util';
import filesize from'gulp-filesize';
import cssBase64 from'gulp-css-base64';
import stripDebug from'gulp-strip-debug';
import gulpif from'gulp-if';
import sourcemaps from'gulp-sourcemaps';
import clean from'gulp-clean';
import yargs from 'yargs';
import gulpsync from 'gulp-sync';
import babel from 'gulp-babel';

const argv = yargs.argv;
const sync = gulpsync(gulp);

const cmd = {
    connect: 'browser-sync',
    styles: 'styles',
    watch: 'watch',
    clean: 'clean',
    move: 'move',
    img: 'img',
};

gulp.task(cmd.connect, function() {
    browsersync.init({
        server: {
            baseDir: "./dist/"
        },
        notify: false
    });
});

gulp.task(cmd.clean, function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

gulp.task(cmd.styles, function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(sass(
            {
                includePaths: bourbon.includePaths
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssBase64({
            baseDir: './src/images',
            extensionsAllowed: ['.jpg', '.png', '.gif', '.svg']
        }))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS())
        .pipe(gulpif(!argv.production, sourcemaps.write()))
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browsersync.reload({stream: true}))
});

gulp.task(cmd.move, function () {    
    gulp.src([
        './src/index.html'
    ])
    .pipe(gulp.dest("./dist/"));     
});

gulp.task(cmd.img, function () {    
    gulp.src([
        './src/img/**/*'
    ])
    .pipe(gulp.dest("./dist/img"));     
});

gulp.task(cmd.watch, [cmd.connect], function () {
    gulp.watch('./src/sass/**/*.scss', [cmd.styles]);
    gulp.watch('./src/**/*.html', [cmd.move], browsersync.reload);
});

gulp.task('build', sync.sync([cmd.clean, cmd.styles, cmd.move, cmd.img]));

gulp.task('default', [cmd.watch]);