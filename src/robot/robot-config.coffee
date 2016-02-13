"use strict"

angular

  .module( "app.robot" )

  .config( ($stateProvider) ->

    $stateProvider

      # Root
      .state( "app.robots",
        parent: "AuthLayout"
        abstract: true
        template: "<ui-view/>"
      )

      # List
      .state( "app.robots.list",
        url: "^/robots"
        templateUrl: "list-robots.html"
        controller: "ListRobotsCtrl as robotsCtrl"
      )

      # Add
      .state( "app.robots.add",
        url: "^/robots/add"
        templateUrl: "add-robot.html"
        controller: "AddRobotCtrl as robotCtrl"
      )

      # Edit
      .state( "app.robots.edit",
        url: "^/robots/{robotId:[0-9a-fA-F]{24}}/edit"
        templateUrl: "edit-robot.html"
        controller: "EditRobotCtrl as robotCtrl"
      )

      # Control
      .state( "app.robots.control",
        url: "^/robots/{robotId:[0-9a-fA-F]{24}}/control"
        templateUrl: "control-robot.html"
        controller: "ControlRobotCtrl as robotCtrl"
      )
  )
