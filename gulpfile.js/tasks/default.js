'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('default', function (cb) {
  return runSequence('clean', [
    'mockData',
    'copyIndex',
    'fonts',
    'images',
    'css',
    'vendorJs',
    'appJs'],
    'link', cb)
})
