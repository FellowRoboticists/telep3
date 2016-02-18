const jwt = require('jsonwebtoken');
const Robot = require('./robot-model');

var RobotWorker = function(robot) {

  this.robot = robot;

  this.process = function(job) {
    console.log("Tube name: %j", this.robot.name);
    return new Promise( (resolve, reject) => {
      var payload = jwt.verify(job.payload, this.robot.publicKey, (err, payload) => {
        if (err) { return reject(err) }

        socketIO.sockets.emit('robot:message', JSON.stringify(payload));
        resolve();
      });
    });
  };

};

module.exports = RobotWorker;
