'use strict'

const express = require('express')
const router = express.Router()

const User = require('./user-model')
const tokenMW = require('../token/token-middleware')

/**
 * GET /users
 *
 * Returns the list of users in the system.
 *
 * Caller must be authenticated.
 */
router.get(
  '/',
  tokenMW.processJWTToken,
  tokenMW.verifyAuthenticated,
  function __getUsers (req, res, next) {
    User.find({})
      .then((users) => res.json(users))
  })

/**
 * Handles the user id param passed in some URI's.
 *
 * Sets the 'user' variable on the req object.
 */
router.param(
  'user',
  function __findUserById (req, res, next, id) {
    User.findById(id)
      .then((user) => {
        if (!user) return next(new Error('Unable to find user'))
        req.user = user
        next()
      })
      .catch(next)
  })

/**
 * GET /users/:user
 *
 * Returns the data for the specified user.
 *
 * Caller must be authenticated.
 */
router.get(
  '/:user',
  tokenMW.processJWTToken,
  tokenMW.verifyAuthenticated,
  function __getUser (req, res, next) {
    res.json(req.user)
  })

/**
 * POST /users
 *
 * Creates a new user in the system.
 *
 * Returns the list of users after the new user was added.
 *
 * Caller must be authenticated.
 */
router.post(
  '/',
  tokenMW.processJWTToken,
  tokenMW.verifyAuthenticated,
  tokenMW.verifyRequest,
  function __createUser (req, res, next) {
    let user = new User(req.body)
    user
      .save()
      .then((u) => User
           .find()
           .then((users) => res.json(users))
      )
  })

/**
 * PUT /users/:user
 *
 * Update the specified user.
 *
 * Returns the updated user.
 *
 * Caller must be authenticated.
 */
router.put(
  '/:user',
  tokenMW.processJWTToken,
  tokenMW.verifyAuthenticated,
  tokenMW.verifyRequest,
  function __updateUser (req, res, next) {
    let user = req.user

    user.name = req.body.name
    user.email = req.body.email
    user.locked = req.body.locked
    if (req.body.password && req.body.password.length > 0) {
      user.password = req.body.password
    }
    user.permissions = req.body.permissions
    user.markModified('permissions')

    user.save()
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err.stack)
        res.status(500).send(err.message)
      })
  })

/**
 * DELETE /users/:user
 *
 * Deletes the specified user.
 *
 * Returns the deleted user.
 *
 * Caller must be authenticated.
 */
router.delete(
  '/:user',
  tokenMW.processJWTToken,
  tokenMW.verifyAuthenticated,
  tokenMW.verifyRequest,
  function __deleteUser (req, res, next) {
    User.remove({ _id: req.user._id })
      .then((u) => res.json(req.user))
  })

module.exports = router
