'use strict'

const gulp = require('gulp')
const del = require('del')

gulp.task('cleanProd', function (cb) {
  return del(['./prod/*'], cb)
})
