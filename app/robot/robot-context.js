module.exports = (() => {

  const Robot = require('./robot-model');
  const queueSVC = require('../utility/queue-service');

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
    return queueSVC.queueJob('talker', robot.name, 100, 0, 300, JSON.stringify(robotParams))
  };

  var mod = {

    getRobotList: getRobotList,
    createRobot: createRobot,
    updateRobot: updateRobot,
    deleteRobot: deleteRobot,
    controlRobot: controlRobot

  };

  return mod;

}());
