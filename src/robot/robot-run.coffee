"use strict"

angular

  .module( "app.robot" )

  .run( ($log, socket, NotificationsFactory) ->

    #
    # Message from the robot
    #
    socket.on("robot:message", (messageObj) ->
      obj = JSON.parse(messageObj)
      $log.debug "Received a robot message #{obj}"
      NotificationsFactory.info("Message from robot: #{obj.name}")
    )
  )
