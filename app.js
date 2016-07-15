'use strict'

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const queueSVC = require('robot-queue-service')
const messageSVC = require('./app/utility/messaging-service')
const database = require('./config/database')
const rabbit = require('./config/rabbit')
const winston = require('winston')
const expressWinston = require('express-winston')

// Set up the logging level based on the environment
winston.level = process.env.LOG_LEVEL || 'warn'
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, { json: false })

// ##############################################################
// Mongoose settings

// Tell mongoose to use the ES6 Promise
mongoose.Promise = global.Promise

mongoose.connect(database.url)

var app = express()

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      level: process.env.LOG_LEVEL || 'warn'
    })
  ],
  meta: false, // defaults to true
  ignoreRoute: function (req, res) { return false }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/token', require('./app/token/token-controller'))
app.use('/users', require('./app/user/user-controller'))
app.use('/robots', require('./app/robot/robot-controller'))
app.use('/messages', require('./app/message/message-controller'))
app.use('/documents', require('./app/document/document-controller'))

// Error logger...
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: false
    })
  ],
  meta: false // defaults to true
}))

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
      winston.log('error', err.stack)
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

queueSVC.connect(rabbit.url, rabbit.options)
  .then((conn) => {
    return queueSVC.createChannel('talker')
      .then((ch) => {
        winston.log('info', 'talker channel established')
        return queueSVC.createChannel('listener')
          .then((ch) => {
            winston.log('info', 'listener channel established')
            return queueSVC.consume('listener', 'robotQueue', messageSVC.robotQueueWorker)
              .then(() => {
                winston.log('info', 'listening for robotQueue messages')
              })
          })
      })
  })
  .catch((err) => {
    winston.log('error', 'Error: %j', err)
  })

module.exports = app
