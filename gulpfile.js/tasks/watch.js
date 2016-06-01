'use strict'

const config = require('../config.json')
const gulp = require('gulp')

gulp.task('watch', ['default'], function () {
  gulp.watch(['./src/**/*-mock-data.json'], ['mockData'])
  gulp.watch(['./src/index.html'], ['copyIndex'])
  gulp.watch(['./src/**/*.{png,gif,jpg,svg}'], ['images'])
  gulp.watch(['./src/**/*.{scss,css}'], ['css'])
  gulp.watch(config.vendor_js, ['vendorJs'])
  gulp.watch(['./src/**/*.coffee'], ['appJs'])
  gulp.watch(['./src/**/*.html'], ['appJs'])
})
