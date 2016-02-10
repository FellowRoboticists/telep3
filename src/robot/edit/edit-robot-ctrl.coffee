"use strict"

angular

  .module( "app.robot" )

  .controller( "EditRobotCtrl", ($state, Robot, NotificationsFactory, $interpolate, MESSAGES) ->

    vm = @

    console.log("Robot ID: %j", $state.params.robotId)

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

    vm.save = (robot) ->
      robot
        .save()
        .then( (robot) ->
          NotificationsFactory.successAfterTransition(
            $interpolate(MESSAGES.CRUD.SUCCESS.UPDATE)(robot)
          )
          $state.go("app.robots.list")
        ,(error)->
          NotificationsFactory.error(
            $interpolate(MESSAGES.CRUD.ERROR.UPDATE)({name:"Robot"})
          )
        )

    return

  )
