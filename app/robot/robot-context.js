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
    return Document.remove({ _id: robot._id });
  };

  var mod = {

    getRobotList: getRobotList

  };

  return mod;

});
