"use strict"

angular

  .module( "app.robot" )

  .controller( "DeleteRobotCtrl", ($uibModalInstance, NotificationsFactory, Robot, selectedRobot, $interpolate, MESSAGES) ->

    vm = @

    vm.robot = new Robot(selectedRobot)

    vm.delete = ->
      vm.robot
        .delete()
        .then( (robot) ->
          NotificationsFactory.success(
            $interpolate(MESSAGES.CRUD.SUCCESS.DELETE)(robot)
          )
          $uibModalInstance.close(robot)
        ,(error) ->
          NotificationsFactory.error(
            $interpolate(MESSAGES.CRUD.ERROR.DELETE)({name: "Robot"})
          )
          $uibModalInstance.close(error)
        )

    vm.cancel = ->
      $uibModalInstance.dismiss('cancel')

    return
  )

