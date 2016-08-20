'use strict'

module.exports = (function () {
  const fs = require('fs')

  const CA_CERT = process.env.RABBITMQ_CA_CERT
  const CLIENT_CERT = process.env.TELEP_CLIENT_CERT
  const CLIENT_KEY = process.env.TELEP_CLIENT_KEY

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
