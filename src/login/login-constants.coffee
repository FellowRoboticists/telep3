"use strict"

angular

  .module( "app.login" )

  .constant( "LOGIN",

    "MESSAGES":

      "LOCKED":
        """
          Your {{name}} is locked. Please contact <a href='mailto:naiveroboticist@gmail.com?subject=Why is my {{name}} locked?'>
          naiveroboticist@gmail.com</a> for more information.
        """

      "BAD_CREDENTIALS": "Incorrect email or password."
  )
