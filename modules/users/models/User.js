const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Userame is required'],
    minlength: [2, 'Username can\'t be smaller than 2 characters'],
    maxlength: [64, 'Username can\'t be greater than 64 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    maxlength: [128, 'Email can\'t be greater than 128 characters'],
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  pfpLink: {
    type: String,
    required: [true, 'Profile picture is required']
  },
  admin: {
    type: Boolean,
    default: false
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

// validates unique email
userSchema.path('email').validate(async (email) => {
  const emailCount = await mongoose.models.users.countDocuments({ email })
  return !emailCount
}, 'Account with the same email adress already exists')

// validates unique username
userSchema.path('username').validate(async (username) => {
  const usernameCount = await mongoose.models.users.countDocuments({ username })
  return !usernameCount
}, 'Account with the same username already exists')

// encrypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password)
  return result
}

const User = mongoose.model('users', userSchema)

module.exports = User
