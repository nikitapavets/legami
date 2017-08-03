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

gulp.task(cmd.styles, function () {
    return gulp.src('./sass/**/*.scss')
        .pipe(gulpif(!argv.production, sourcemaps.init()))
        .pipe(sass(
            {
                includePaths: bourbon.includePaths
            }
        ).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cssBase64({
            baseDir: './images/',
            extensionsAllowed: ['.jpg', '.png', '.gif', '.svg']
        }))
        .pipe(rename('main.min.css'))
        .pipe(cleanCSS())
        .pipe(gulpif(!argv.production, sourcemaps.write()))
        .pipe(gulp.dest('./css/'))
        .pipe(browsersync.reload({stream: true}))
});

gulp.task(cmd.watch, [cmd.styles], function () {
    gulp.watch('./sass/**/*.scss', [cmd.styles]);
});

gulp.task('default', [cmd.watch]);