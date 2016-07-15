'use strict'

const jwt = require('jsonwebtoken')
const winston = require('winston')

var RobotWorker = function (robot) {
  this.robot = robot

  this.process = function (msg) {
    winston.log('info', 'Tube name: %j', this.robot.name)
    return new Promise((resolve, reject) => {
      jwt.verify(msg, this.robot.publicKey, (err, payload) => {
        if (err) {
          if (err instanceof Error) {
            winston.log('error', err.stack)
          } else {
            winston.log('error', 'Error: %j', err)
          }
          return reject(err)
        }

        socketIO.sockets.emit('robot:message', JSON.stringify(payload))
        resolve()
      })
    })
  }
}

module.exports = RobotWorker
