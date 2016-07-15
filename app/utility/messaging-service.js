'use strict'

module.exports = (function () {
  const winston = require('winston')

  const messageQueueWorker = (msg) => {
    return new Promise((resolve, reject) => {
      winston.log('debug', 'Processing job: ')
      winston.log('debug', `  Job Payload: ${msg}`)
      socketIO.sockets.emit('user:logged_out', { msg: msg })
      resolve()
    })
  }

  const robotQueueWorker = (msg) => {
    socketIO.sockets.emit('robot:message', msg)
    return Promise.resolve()
  }

  var mod = {
    messageQueueWorker: messageQueueWorker,
    robotQueueWorker: robotQueueWorker
  }

  return mod
}())
