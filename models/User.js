const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [64, 'Name cant be greater then 64 characters'],
    minlength: [2, 'Name cant be smaller then 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [128, 'Email cant be greater then 128 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema)

module.exports = User
