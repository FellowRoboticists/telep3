"use strict"

angular

  .module( "app.components" )
  
  .component( "robotResponses",
    templateUrl: 'robot-responses.html'
    controllerAs: 'responsesCtrl'
    controller: (RobotResponsesFactory) ->
      self = this
      self.factory = RobotResponsesFactory
      return self

  )
