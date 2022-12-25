const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
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
  },
  isVisible:
  {
      type: Boolean, default: true
  }

})


const population =
  [{
    path: 'user',
    match: { isVisible: true }
  }]

ProfileSchema.pre('find', findVisible(population));
ProfileSchema.pre('findOne', findVisible(population));
ProfileSchema.pre('findOneAndUpdate', findVisible());
ProfileSchema.pre('count', findVisible());
ProfileSchema.pre('countDocuments', findVisible());

ProfileSchema.plugin(deepPopulate,{})



module.exports = Profile = mongoose.model('Profile', ProfileSchema);