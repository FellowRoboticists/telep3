'use strict'

const gulp = require('gulp')
const runSequence = require('run-sequence')
const revCollector = require('gulp-rev-collector')
const minifyCss = require('gulp-minify-css')
const rev = require('gulp-rev')
const q = require('q')

gulp.task('revCss', function (cb) {
  let deferred = q.defer()

  gulp.task('_rev_css', function () {
    return gulp.src(['./dist/css/styles.css'])
      .pipe(minifyCss())
      .pipe(rev())
      .pipe(gulp.dest('./prod/css'))
      .pipe(rev.manifest('styles.json'))
      .pipe(gulp.dest('./dist/rev'))
  })

  gulp.task('_rev_cssUrls', function () {
    return gulp.src(['./dist/rev/styles.json', './prod/index.html'])
      .pipe(revCollector())
      .pipe(gulp.dest('./prod/'))
      .on('end', function () {
        deferred.resolve()
      })
  })

  runSequence('_rev_css', '_rev_cssUrls')

  return deferred.promise
})
