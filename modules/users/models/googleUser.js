const mongoose = require('mongoose')
const Schema = mongoose.Schema

const googleUserSchema = new Schema({
  username: String,
  googleId: String
})

const UserGoogle = mongoose.model('users', )  //11 6 36
