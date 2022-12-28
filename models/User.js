const mongoose = require("mongoose");
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
mongoose.set('strictQuery', false);
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  Birthday: {
    required: true,
    type: String,
  },
  phone: {
    type: String,
    length: 11,
    required: true,
  },
  avatar: {
    type: String
  },
  isVisible:
    {
        type: Boolean, default: true
    },
      isAdmin:
      {type:Number}
});

const population =[]

    UserSchema.pre('find', findVisible(population));
    UserSchema.pre('findOne', findVisible(population));
    UserSchema.pre('findOneAndUpdate', findVisible());
    UserSchema.pre('count', findVisible());
    UserSchema.pre('countDocuments', findVisible());

    UserSchema.plugin(deepPopulate,{})

 
module.exports = User = mongoose.model('User', UserSchema);
