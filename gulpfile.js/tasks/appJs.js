'use strict'

const gulp = require('gulp')
const eventStream = require('event-stream')
const concat = require('gulp-concat')
const changed = require('gulp-changed')
const flatten = require('gulp-flatten')
const minifyHtml = require('gulp-minify-html')
const angularTemplatecache = require('gulp-angular-templatecache')
const coffee = require('gulp-coffee')
const ngAnnotate = require('gulp-ng-annotate')

gulp.task('appJs', function (cb) {
  function _templates () {
    return gulp.src(['./src/**/*.html'])
      .pipe(flatten())
      .pipe(minifyHtml())
      .pipe(angularTemplatecache())
  }

  function _coffeescript () {
    return gulp.src(['./src/**/*module.coffee', './src/**/*.coffee'])
      .pipe(coffee())
      .pipe(ngAnnotate())
  }

  return eventStream.merge(_templates(), _coffeescript())
    .pipe(changed('./dist/js'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js'))
})
