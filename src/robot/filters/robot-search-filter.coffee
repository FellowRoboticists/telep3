"use strict"

angular

  .module( "app.robot" )

  .filter( "robotSearchFilter", ->
    (robots, text) ->

      if !text then return robots

      searchQuery = angular.lowercase(text)

      filteredCollection = []

      nameMatch = (robot) ->
        name = angular.lowercase(robot.name)
        name.indexOf(searchQuery) isnt -1

      for robot in robots
        if nameMatch(robot)
          filteredCollection.push(robot)

      filteredCollection

  )
