'use strict'

module.exports = (function () {
  const Robot = require('./robot-model')

  const robotParam = function __findRobotById (req, res, next, id) {
    Robot.findById(id)
      .then((robot) => {
        if (!robot) return next(new Error('Unable to find robot'))
        req.robot = robot
        next()
      })
      .catch(next)
  }

  var mod = {

    robotParam: robotParam

  }

  return mod
}())
