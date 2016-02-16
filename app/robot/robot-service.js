module.exports = (() => {
  
  var RobotWorker = {

    name: null,

    process: function(job) {
      console.log("Tube name: %j", this.name);
      socketIO.sockets.emit('robot:message', job.payload);
      return Promise.resolve();
    }
  };

  var mod = {

    RobotWorker: RobotWorker

  };

  return mod;

}());
