'use strict'

module.exports = (function () {
  var mod = {
    telepPrivateKey: process.env.TELEP_PRIVATE_KEY,
    jwtAlgorithm: 'RS512',
    jwtSecret: process.env.JWT_SECRET
  }

  return mod
}())

