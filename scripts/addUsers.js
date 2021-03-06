#!/usr/bin/env node
'use strict'

// require('../bootstrap')
const User = require('../app/user/user-model')
const database = require('../config/database')

const mongoose = require('mongoose')

mongoose.connect(database.url)

let conn = mongoose.connection
conn.on('error', console.error.bind(console, 'connection error: '))
conn.once('open', () => {
  var user = new User({
    name: 'user1',
    email: 'user1@mail.com',
    password: 'Pass1234',
    permissions: {
      manageUsers: true
    },
    locked: false
  })

  user.save()
    .then((u) => {
      console.log(`Saved new user: ${u}`)
      process.exit()
    })
    .catch((err) => {
      console.log(err.stack)
      process.exit()
    })
})
