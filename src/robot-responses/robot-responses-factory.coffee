"use strict"

angular

  .module( "app.components" )

  .factory( "RobotResponsesFactory", (locker) ->

    vm = @

    vm.responses = locker.get( "robotResponses", [] )

    vm.add = (response) ->
      if vm.responses.length >= 10
        vm.responses.splice(0, 1)
      vm.responses.push(response)
      locker.put("robotResponses", vm.responses)

    return vm
  )
