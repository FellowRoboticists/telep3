const express = require('express');
const router = express.Router();

const robotCTX = require('./robot-context');
const tokenMW = require('../token/token-middleware');
const robotMW = require('./robot-middleware');

router.param('robot', robotMW.robotParam);

router.get('/', 
           tokenMW.processJWTToken,
           tokenMW.verifyAuthenticated,
           (req, res, next) => {

  robotCTX.getRobotList().
    then( (robots) => res.json(robots) ).
    catch( next );
});

router.get('/:robot', 
           tokenMW.processJWTToken,
           tokenMW.verifyAuthenticated,
           (req, res, next) => {

  res.json(req.robot);
});

router.post('/',
           tokenMW.processJWTToken,
           tokenMW.verifyAuthenticated,
           (req, res, next) => {

  robotCTX.createRobot(req.body).
    then( (robot) => res.json(robot) ).
    catch( next );
});

router.put('/:robot',
           tokenMW.processJWTToken,
           tokenMW.verifyAuthenticated,
           (req, res, next) => {

  robotCTX.updateRobot(req.robot, req.body).
    then( (robot) => res.json(robot) ).
    catch( next );
});

router.delete('/:robot',
           tokenMW.processJWTToken,
           tokenMW.verifyAuthenticated,
           (req, res, next) => {

  robotCTX.deleteRobot(req.robot).
    then( () => res.json(req.robot) ).
    catch( next );
});

module.exports = router;
