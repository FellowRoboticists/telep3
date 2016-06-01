'use strict'

const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('link', ['unlink'], function () {
  return gulp.src('')
    .pipe(shell(['gulpfile.js/scripts/link.sh']))
})
