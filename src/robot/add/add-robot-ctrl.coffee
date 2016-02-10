"use strict"

angular

  .module( "app.robot" )

  .controller( "AddRobotCtrl", ($state, Robot, NotificationsFactory, $interpolate, MESSAGES) ->

    vm = @

    vm.robot = new Robot()

    vm.save = (robot) ->
      robot
        .save()
        .then( (robot) ->
          NotificationsFactory.successAfterTransition(
            $interpolate(MESSAGES.CRUD.SUCCESS.CREATE)(robot)
          )
          $state.go("app.robots.list")
        ,(error) ->
          NotificationsFactory.error(
            $interpolate(MESSAGES.CRUD.ERROR.CREATE)({name: "Robot"})
          )
        )

    return

  )
