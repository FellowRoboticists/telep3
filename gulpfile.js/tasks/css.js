'use strict'

const config = require('../config.json')
const gulp = require('gulp')
const eventStream = require('event-stream')
const concat = require('gulp-concat')
const sass = require('gulp-sass')
const changed = require('gulp-changed')
const stripComments = require('gulp-strip-comments')

gulp.task('css', function (cb) {
  // Init vendor css stream
  function _vendorCss () {
    return gulp.src(config.vendor_css_src)
      .pipe(stripComments())
  }

  // Init app sass stream
  function _appSass () {
    return gulp.src(['./src/**/*.scss'])
      .pipe(sass({errLogToConsole: true}))
  }

  // Join vendor/app css streams
  return eventStream.merge(_vendorCss(), _appSass())
    .pipe(changed('./dist/css'))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist/css'))
})
