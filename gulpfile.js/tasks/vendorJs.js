'use strict'

const config = require('../config.json')
const gulp = require('gulp')
const changed = require('gulp-changed')
const ngAnnotate = require('gulp-ng-annotate')
const concat = require('gulp-concat')
const stripComments = require('gulp-strip-comments')

gulp.task('vendorJs', function (cb) {
  return gulp.src(config.vendor_js_src)
    .pipe(changed('./dist/js'))
    .pipe(concat('vendor.js'))
    .pipe(stripComments({line: true}))
    .pipe(ngAnnotate())
    .pipe(gulp.dest('./dist/js'))
})
