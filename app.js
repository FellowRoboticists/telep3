'use strict'
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const queueSVC = require('./app/utility/queue-service')
const messageSVC = require('./app/utility/messaging-service')
const database = require('./config/database')
const beanstalk = require('./config/beanstalk')

// require('./bootstrap')

// ##############################################################
// Mongoose settings

// Tell mongoose to use the ES6 Promise
mongoose.Promise = global.Promise

mongoose.connect(database.url)

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use('/', routes)
app.use('/token', require('./app/token/token-controller'))
app.use('/users', require('./app/user/user-controller'))
app.use('/robots', require('./app/robot/robot-controller'))
app.use('/messages', require('./app/message/message-controller'))
app.use('/documents', require('./app/document/document-controller'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    if (err.status !== 404) {
      console.error(err.stack)
    }
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

if (process.env.NODE_ENV === 'development') {
  let filePath = path.join(__dirname, 'documentation/routes.generated.txt')

  require('express-print-routes')(app, filePath)
}

// Start up the beanstalk queuing
queueSVC.connect('listener', beanstalk.host, beanstalk.port)
  .then(() => {
    console.log('Starting to listen on robotQueue')
    queueSVC.processJobsInTube('listener', 'robotQueue', messageSVC.robotQueueWorker)
      .then(() => console.log('--'))
  })

queueSVC.connect('talker', beanstalk.host, beanstalk.port)
  .then(() => {
    console.log('Talker ready for speaking')
  })

module.exports = app
