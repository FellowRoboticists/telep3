"use strict"

angular

  .module( "app.components" )

  .run( ($log, RobotResponsesFactory, socket) ->

    socket.on("robot:message", (messageObj) ->
      obj = JSON.parse(messageObj)
      RobotResponsesFactory.add(obj)

    )
  )
