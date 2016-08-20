'use strict'

module.exports = (function () {
  var mod = {
    telepPrivateKey: '/etc/telep/private/telep_rsa',
    jwtAlgorithm: 'RS512',
    jwtSecret: process.env.JWT_SECRET
  }

  return mod
}())

