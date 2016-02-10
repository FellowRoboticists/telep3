module.exports = (() => {

  const Robot = require('./robot-model');

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

  var mod = {

    getRobotList: getRobotList,
    createRobot: createRobot,
    updateRobot: updateRobot,
    deleteRobot: deleteRobot

  };

  return mod;

}());
