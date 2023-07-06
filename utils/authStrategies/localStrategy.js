const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../modules/users/models/User')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return done(null, false, { error: 'User not found' })
    if (await user.checkPassword(password)) return done(null, user)
    return done(null, false, { error: 'Incorrect password' })
  } catch (e) {
    return done(e)
  }
}))

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser(async (id, done) => {
  try {
    // console.log(id)
    const user = await User.findOne(id)
    return done(null, user)
  } catch (e) {
    return done(e)
  }
})
