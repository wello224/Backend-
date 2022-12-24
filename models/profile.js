const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  },
  handle: {
    type: String,
    required: true,
  },
  Address: {
    type: String
  },
  Gender: {
    type: String,
    required: true
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);