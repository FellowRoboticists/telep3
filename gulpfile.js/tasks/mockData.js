'use strict'

const gulp = require('gulp')
const flatten = require('gulp-flatten')

gulp.task('mockData', function (cb) {
  return gulp.src(['./src/**/*-mock-data.json'])
    .pipe(flatten())
    .pipe(gulp.dest('./dist/js'))
})
