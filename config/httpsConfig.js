'use strict'

module.exports = (function () {
  const fs = require('fs')

  const HTTPS_KEY = process.env.TELEP_HTTPS_KEY
  const HTTPS_CERT = process.env.TELEP_HTTPS_CERT
  const DEFAULT_PORT = '8443'

  var mod = {
    port: process.env.PORT || DEFAULT_PORT,
    key: fs.readFileSync(HTTPS_KEY),
    cert: fs.readFileSync(HTTPS_CERT)
  }

  return mod
}())
