module.exports = (() => {

  const Robot = require('./robot-model');
  const queueSVC = require('../utility/queue-service');
  const robotSVC = require('../robot/robot-service');

  const getRobotList = () => {
    return Robot.find({});
  };

  const createRobot = (robotParams) => {
    var robot = new Robot(robotParams);
    return robot.save();
  };

  const updateRobot = (robot, robotParams) => {
    robot.name = robotParams.name;
    robot.publicKey = robotParams.publicKey;

    return robot.save();
  };

  const deleteRobot = (robot) => {
    return Robot.remove({ _id: robot._id });
  };

  const controlRobot = (robot, robotParams) => {
    return queueSVC.queueJob('talker', robot.name + 'Command', 100, 0, 300, JSON.stringify(robotParams))
  };

  const startRobotTube = (robot) => {
    var robotClone = JSON.parse(JSON.stringify(robot));
    return queueSVC.connect(robotClone.name, config.beanstalk.host, config.beanstalk.port).
      then( () => {
        queueSVC.processRobotJobsInTube(robotClone.name, 
                                               robotClone.name, 
                                               Object.create(robotSVC.RobotWorker, { name: { value: robotClone.name } })).
          then( () => {
          });

        robotClone.tubeConnected = queueSVC.hasConnection(robotClone.name);
        return robotClone;
      });
  };

  var mod = {

    getRobotList: getRobotList,
    createRobot: createRobot,
    updateRobot: updateRobot,
    deleteRobot: deleteRobot,
    controlRobot: controlRobot,
    startRobotTube: startRobotTube

  };

  return mod;

}());
