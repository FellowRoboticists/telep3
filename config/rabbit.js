'use strict'

module.exports = (function () {
  const fs = require('fs')

  const CA_CERT = '/etc/ssl/certs/st-ca.crt'
  const CLIENT_CERT = '/etc/telep/certs/stc-cert.pem'
  const CLIENT_KEY = '/etc/telep/private/stc-key.pem'

  var mod = {
    url: 'amqps://localhost:5671',
    options: {
      cert: fs.readFileSync(CLIENT_CERT),
      key: fs.readFileSync(CLIENT_KEY),
      rejectUnauthorized: false,
      ca: [ fs.readFileSync(CA_CERT) ]
    }
  }

  return mod
}())
