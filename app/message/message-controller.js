'use strict'

const express = require('express')
const router = express.Router()

const queueSVC = require('robot-queue-service')

/**
 * POST /messages
 *
 * Submits a message to WebSockets for the client to receive.
 *
 * Just a test action
 */
router.post(
  '/',
  function __queueMessage (req, res, next) {
    queueSVC.queueJob('talker', 'messageQueue', 100, 0, 300, 'joyful dog')
      .then(() => res.json({ status: 'sent' }))
      .catch(next)
  })

module.exports = router
