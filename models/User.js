const mongoose = require("mongoose");
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
    required:true,
    type: String,
  },
  phone:{
    type: Number,
    length:11,
    required:true,
  },avatar: {
    type: String
  }
});
module.exports= User =mongoose.model('user', UserSchema);
