'use strict'

module.exports = (function () {
  const Robot = require('./robot-model')
  const queueSVC = require('../utility/queue-service')
  const RobotWorker = require('../robot/robot-worker')
  const jwt = require('jsonwebtoken')
  const fs = require('fs')
  const secrets = require('../../config/secrets')
  const beanstalk = require('../../config/beanstalk')

  var __privateKey = null

  const __getPrivateKey = () => {
    return new Promise((resolve, reject) => {
      if (!__privateKey) {
        fs.readFile(secrets.telepPrivateKey, 'utf8', (err, key) => {
          if (err) return reject(err)
          __privateKey = key
          resolve(key)
        })
      } else {
        resolve(__privateKey)
      }
    })
  }

  const getRobotList = () => {
    return Robot.find({})
  }

  const createRobot = (robotParams) => {
    let robot = new Robot(robotParams)
    return robot.save()
  }

  const updateRobot = (robot, robotParams) => {
    robot.name = robotParams.name
    robot.publicKey = robotParams.publicKey

    return robot.save()
  }

  const deleteRobot = (robot) => {
    return Robot.remove({ _id: robot._id })
  }

  const controlRobot = (robot, robotParams) => {
    return __getPrivateKey()
      .then((privateKey) => {
        const token = jwt.sign(robotParams, privateKey, { algorithm: secrets.jwtAlgorithm })
        return queueSVC.queueJob('talker', robot.name + 'Command', 100, 0, 300, token)
      })
  }

  const startRobotTube = (robot) => {
    let robotClone = JSON.parse(JSON.stringify(robot))
    return queueSVC.connect(robotClone.name, beanstalk.host, beanstalk.port)
      .then(() => {
        queueSVC.processRobotJobsInTube(robotClone.name, robotClone.name, new RobotWorker(robotClone))
          .then(() => null)

        robotClone.tubeConnected = queueSVC.hasConnection(robotClone.name)
        return robotClone
      })
  }

  var mod = {

    getRobotList: getRobotList,
    createRobot: createRobot,
    updateRobot: updateRobot,
    deleteRobot: deleteRobot,
    controlRobot: controlRobot,
    startRobotTube: startRobotTube

  }

  return mod
}())
