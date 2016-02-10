"use strict"

angular

  .module( "app.robot" )

  .service( "Robot", (RailsResource) ->

    class Robot extends RailsResource

      @configure
        url: '/robots'

      constructor: (data) ->
        super(data)

    Robot
  )
