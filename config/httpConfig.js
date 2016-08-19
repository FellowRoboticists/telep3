'use strict'

module.exports = (function () {
  const DEFAULT_PORT = '3000'

  var mod = {
    port: process.env.PORT || DEFAULT_PORT,
  }

  return mod
}())
