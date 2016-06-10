"use strict"

angular

  .module( "app.robot" )

  .controller( "ControlRobotCtrl", ($scope, hotkeys, $state, $http, Robot, NotificationsFactory) ->

    vm = @

    vm.lastCommand = ""

    Robot
      .get($state.params.robotId)
      .then( (robot) ->
        vm.robot = robot
      ,(error) ->
        NotificationsFactory.error(
          $interpolate(MESSAGES.CRUD.ERROR.RETRIEVE)({name:"Robot"})
        )
        $state.go("app.robots.list")
      )

    vm.connectTube = (robotName) ->
      $http
        .put("/robots/#{$state.params.robotId}/tube", { tubeName: robotName })
        .then( (response) ->
          console.log("Robot response: %j", response.data)
          vm.robot = new Robot(response.data)
          # vm.robot.tubeConnected = true
        ,(error) ->
          console.log("Error: %j", error)
        )

    vm.robotMove = (movement) ->
      vm.lastCommand = movement
      $http
        .put("/robots/#{$state.params.robotId}/control", { command: movement })
        .then( (response) ->
          console.log("Made it")
        ,(error) ->
          console.log("Error: %j", error)
        )

    hotkeys
      .bindTo($scope)
      .add(
        combo: "right"
        description: "Turn right"
        callback: ->
          vm.robotMove("right")
      )
      .add(
        combo: "left"
        description: "Turn left"
        callback: ->
          vm.robotMove("left")
      )
      .add(
        combo: "up"
        description: "Move forward"
        callback: ->
          vm.robotMove("forward")
      )
      .add(
        combo: "down"
        description: "Move backward"
        callback: ->
          vm.robotMove("backward")
      )
      .add(
        combo: "space"
        description: "Stop"
        callback: ->
          vm.robotMove("stop")
      )
      .add(
        combo: "pageup"
        description: "Speed up"
        callback: ->
          vm.robotMove("speedup")
      )
      .add(
        combo: "pagedown"
        description: "Slow down"
        callback: ->
          vm.robotMove("slowdown")
      )
      .add(
        combo: "c"
        description: "Connect"
        callback: ->
          vm.robotMove("connect")
      )

    return
  )
