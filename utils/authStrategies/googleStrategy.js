const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../modules/users/models/User')
const config = require('../config')

passport.serializeUser((user, done) => {
  return done(null, user._id)
})

passport.deserializeUser((user, done) => {
  return done(null, user)
})

passport.use(new GoogleStrategy({
  clientID: config.googleClientId,
  clientSecret: config.googleClientSecret,
  callbackURL: 'htt://localhost:3000/auth/google/callback'
},
function (accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user)
  })
}
))
