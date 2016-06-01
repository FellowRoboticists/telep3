#!/usr/bin/env node
'use strict'

const jwt = require('jsonwebtoken')

let payload = {
  user_id: 1234,
  csrf_token: 'abcdefghijklmnopqrstuvwxyz'
}

let token = jwt.sign(payload, 'this is my secret', { expiresIn: 60 * 60 * 24 })

console.log('The token: %j', token)

payload = jwt.decode(token, { complete: true })

console.log('The decoded payload: %j', payload)
