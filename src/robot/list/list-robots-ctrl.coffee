"use strict"

angular

  .module( "app.robot" )

  .controller( "ListRobotsCtrl", (Robot, loader, NotificationsFactory, Collection, $uibModal) ->

    vm = @

    vm.loader = loader

    # Load the robots from the backend
    __loadRobots = ->
      loader.activate("Loading robots...")
      Robot
        .query()
        .then( (robots) ->
          vm.robots = new Collection.fromArray(robots).sortBy("name")
        ,(error) ->
          NotificationsFactory.error(
            $interpolate(MESSAGES.CRUD.ERROR.RETRIEVE)({name: "Robots"})
          )
        )
        .finally( ->
          loader.deactivate()
        )

    # Actually load the robots
    __loadRobots()

    #
    # Open delete confirmation modal
    vm.confirmDelete = (robot) ->
      modal = $uibModal.open(
        templateUrl:"delete-robot.html"
        controller:"DeleteRobotCtrl as robotCtrl"
        windowClass: "modal-danger"
        resolve:
          selectedRobot: -> robot
      )
      modal.result.then( __loadRobots )

    return
  )
