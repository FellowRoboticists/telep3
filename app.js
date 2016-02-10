var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var queueSVC = require('./app/utility/queue-service');
var messageSVC = require('./app/utility/messaging-service');

require('./bootstrap');

// ##############################################################
// Mongoose settings

// Tell mongoose to use the ES6 Promise
mongoose.Promise = global.Promise;

mongoose.connect(config.database.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
app.use('/token', require('./app/token/token-controller'));
app.use('/users', require('./app/user/user-controller'));
app.use('/robots', require('./app/robot/robot-controller'));
app.use('/messages', require('./app/message/message-controller'));
app.use('/documents', require('./app/document/document-controller'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    if (err.status !== 404) {
      console.error(err.stack);
    }
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Start up the beanstalk queuing
queueSVC.connect('listener', config.beanstalk.host, config.beanstalk.port).
  then( () => {
    console.log("Starting to listen on messageQueue");
    queueSVC.processJobsInTube('listener', 'messageQueue', messageSVC.messageQueueWorker).
      then( () => console.log("--") );
  });

queueSVC.connect('talker', config.beanstalk.host, config.beanstalk.port).
  then( () => {
    console.log("Talker ready for speaking");
  });

module.exports = app;
