'use strict'

module.exports = (function () {
  const winston = require('winston')

  const messageQueueWorker = (job) => {
    return new Promise((resolve, reject) => {
      winston.log('debug', 'Processing job: ')
      winston.log('debug', `  Job id: ${job.id}`)
      winston.log('debug', `  Job Payload: ${job.payload}`)
      socketIO.sockets.emit('user:logged_out', { msg: job.payload })
      resolve()
    })
  }

  const robotQueueWorker = (job) => {
    socketIO.sockets.emit('robot:message', job.payload)
    return Promise.resolve()
  }

  var mod = {
    messageQueueWorker: messageQueueWorker,
    robotQueueWorker: robotQueueWorker
  }

  return mod
}())
