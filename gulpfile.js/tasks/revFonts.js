'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')
const revCollector = require('gulp-rev-collector')
const rev = require('gulp-rev')
const q = require('q')

gulp.task('revFonts', function () {
  let deferred = q.defer()

  gulp.task('_rev_fonts', function () {
    return gulp.src(['./dist/fonts/*.woff'])
      .pipe(rev())
      .pipe(gulp.dest('./prod/fonts'))
      .pipe(rev.manifest('fonts.json'))
      .pipe(gulp.dest('./dist/rev'))
  })

  gulp.task('_rev_fontUrls', function () {
    return gulp.src(['./dist/rev/fonts.json', './prod/css/styles-*.css'])
      .pipe(revCollector())
      .pipe(gulp.dest('./prod/css'))
      .on('end', function () {
        deferred.resolve()
      })
  })

  runSequence('_rev_fonts', '_rev_fontUrls')

  return deferred.promise
})
