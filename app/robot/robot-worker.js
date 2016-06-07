'use strict'

const jwt = require('jsonwebtoken')
const winston = require('winston')

var RobotWorker = function (robot) {
  this.robot = robot

  this.process = function (job) {
    winston.log('info', 'Tube name: %j', this.robot.name)
    return new Promise((resolve, reject) => {
      jwt.verify(job.payload, this.robot.publicKey, (err, payload) => {
        if (err) return reject(err)

        socketIO.sockets.emit('robot:message', JSON.stringify(payload))
        resolve()
      })
    })
  }
}

module.exports = RobotWorker
