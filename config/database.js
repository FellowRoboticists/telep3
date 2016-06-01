'use strict'

module.exports = (function () {
  const mongoose = require('mongoose')

  // Configure mongoose to use the ES6 Promise
  mongoose.Promise = global.Promise

  var mod = {
    url: 'mongodb://localhost/telep3'
  }

  return mod
}())
