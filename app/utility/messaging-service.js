'use strict'

module.exports = (function () {
  const messageQueueWorker = (job) => {
    return new Promise((resolve, reject) => {
      console.log('Processing job: ')
      console.log(`  Job id: ${job.id}`)
      console.log(`  Job Payload: ${job.payload}`)
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
