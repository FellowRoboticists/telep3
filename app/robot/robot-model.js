var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RobotSchema = new Schema({

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
});

RobotSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  if (! this.createdAt) {
    this.createdAt = this.updatedAt;
  }
  next();
});

module.exports = mongoose.model('Robot', RobotSchema);
