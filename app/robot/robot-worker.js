var RobotWorker = function(name) {

  this.name = name;

  this.process = function(job) {
    console.log("Tube name: %j", this.name);
    socketIO.sockets.emit('robot:message', job.payload);
    return Promise.resolve();
  }
};

module.exports = RobotWorker;
