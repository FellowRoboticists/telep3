module.exports = (() => {

  var messageQueueWorker = (job) => {
    return new Promise( (resolve, reject) => {
      // reject(new Error("Just faking an error"));
      console.log("Processing job: ");
      console.log(`  Job id: ${job.id}`);
      console.log(`  Job Payload: ${job.payload}`);
      socketIO.sockets.emit('user:logged_out', { msg: job.payload });
      resolve();
    });
  };

  const robotQueueWorker = (job) => {
    socketIO.sockets.emit('robot:message', job.payload);
    return Promise.resolve();
  };

  const telepWorker = (job) => {
    socketIO.sockets.emit('robot:message', job.payload);
    return Promise.resolve();
  };

  var mod = {
    messageQueueWorker: messageQueueWorker,
    robotQueueWorker: robotQueueWorker,
    telepWorker: telepWorker
  };

  return mod;
}());
