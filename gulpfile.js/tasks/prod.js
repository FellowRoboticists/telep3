'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')

gulp.task('prod', ['default'], function (cb) {
  return runSequence(
    'cleanProd',
    'copyIndexProd',
    'revCss',
    'revJs',
    'revImages',
    'revFonts',
    'linkProd',
    cb
  )
})
