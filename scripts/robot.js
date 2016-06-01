#!/usr/bin/env node
'use strict'

/**
 * The client for the services provided by the
 * server.
 */

const fs = require('fs')
const jwt = require('jsonwebtoken')
const queueSVC = require('../app/utility/queue-service')
const beanstalk = require('../config/beanstalk')

let __privateKey = null

const __getPrivateKey = () => {
  return new Promise((resolve, reject) => {
    if (!__privateKey) {
      fs.readFile('../Keys/sarah_rsa', 'utf8', (err, key) => {
        if (err) return reject(err)
        __privateKey = key
        resolve(key)
      })
    } else {
      resolve(__privateKey)
    }
  })
}

const respond = (robotName, command) => {
  const payload = {
    name: command
  }

  return __getPrivateKey()
    .then((key) => {
      let token = jwt.sign(payload, key, { algorithm: 'RS512' })

      return queueSVC.queueJob('talker', robotName, 100, 0, 300, token)
    })
}

const RobotWorker = function (robotName, publicKey) {
  this.robotName = robotName
  this.publicKey = publicKey

  this.process = function (job) {
    return new Promise((resolve, reject) => {
      jwt.verify(job.payload, this.publicKey, (err, payload) => {
        if (err) return reject(err)
        console.log('The payload: %j', payload)
        respond(this.robotName, payload.command)
          .then(() => resolve())
          .catch(reject)
      })
    })
  }
}

// Start up the beanstalk queuing
queueSVC.connect('incomingCommands', beanstalk.host, beanstalk.port)
  .then(() => {
    fs.readFile('../Keys/telep_rsa.pub.pem', 'utf8', (err, key) => {
      if (err) {
        console.error('Error reading file: %j', err)
        process.exit(1)
      }
      let worker = new RobotWorker('sarah', key)
      console.log('Starting to listen on %jCommand', worker.robotName)
      queueSVC.processRobotJobsInTube('incomingCommands', worker.robotName + 'Command', worker)
        .then(() => console.log('--'))
    })
  })

queueSVC.connect('talker', beanstalk.host, beanstalk.port)
  .then(() => {
    console.log('Talker ready for speaking')
  })
