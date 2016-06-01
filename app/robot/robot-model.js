'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RobotSchema = new Schema({

  name: {
    type: String,
    required: true
  },

  publicKey: {
    type: String
  },

  createdAt: {
    type: Date
  },

  updatedAt: {
    type: Date
  }
})

// Deal with the toJSON transformation
RobotSchema.options.toJSON = {

  transform: (doc, ret, options) => {
    ret.id = ret._id
    delete ret.__v
    delete ret._id

    return ret
  }
}

RobotSchema.pre('save', function (next) {
  this.updatedAt = new Date()
  if (!this.createdAt) {
    this.createdAt = this.updatedAt
  }
  next()
})

module.exports = mongoose.model('Robot', RobotSchema)
