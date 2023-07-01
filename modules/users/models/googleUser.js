const mongoose = require('mongoose')
const Schema = mongoose.Schema

const googleUserSchema = new Schema({
  username: String,
  googleID: String
})

const UserGoogle = mongoose.model('google-users', googleUserSchema)

module.exports = UserGoogle
