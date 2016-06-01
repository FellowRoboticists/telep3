'use strict'

const gulp = require('gulp')
const del = require('del')

gulp.task('clean', function (cb) {
  return del(['./dist/*'], cb)
})
