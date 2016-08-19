'use strict'

module.exports = (function () {
  const fs = require('fs')

  const HTTPS_KEY = '/etc/ssl/private/telep3-key.pem'
  const HTTPS_CERT = '/etc/ssl/certs/telep3-cert.pem'
  const DEFAULT_PORT = '8443'

  var mod = {
    port: process.env.PORT || DEFAULT_PORT,
    key: fs.readFileSync(HTTPS_KEY),
    cert: fs.readFileSync(HTTPS_CERT)
  }

  return mod
}())
