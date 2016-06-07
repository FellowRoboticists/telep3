'use strict'

const express = require('express')
const router = express.Router()

const User = require('../user/user-model')
const tokenMW = require('./token-middleware')
const winston = require('winston')

/**
 * POST /token
 *
 * Performs the credentials check that will allow a requestor
 * to 'log in' to the system.
 *
 * This action returns a object: { user: user }. It also sets up the JWT
 * and CSRF cookies.
 */
router.post(
  '/',
  function __checkCredentials (req, res, next) {
    User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) return res.status(409).send('Invalid credentials')
        user.comparePassword(req.body.password, (err, valid) => {
          if (err) return res.status(409).send('Invalid credentials')
          if (!valid) return res.status(409).send('Invalid credentials')
          var obj = { user: user }

          // Set up the cookies we need for authentication
          tokenMW.createJWTToken(user, res)
          res.json(obj)
        })
      })
      .catch((err) => {
        winston.log('error', err.stack)
        res.status(500).send(err.message)
      })
  })

/**
 * DELETE /token
 *
 * Effectively, this is a login. In general, what it does is to
 * clear the JWT and CSRF token cookies.
 *
 * Returns an empty object.
 */
router.delete(
  '/',
  function __performLogout (req, res, next) {
    // The key thing here is to remove the authentication/CSRF
    // cookies. Basically, this clears the cookie text and sets
    // the expiration to something in the past. This will force
    // the browser to remove these cookies from the domain.
    res.clearCookie('JWT-TOKEN')
    res.clearCookie('XSRF-TOKEN')

    res.json({})
  })

module.exports = router
