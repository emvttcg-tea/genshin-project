const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../modules/users/models/googleUser')
const config = require('../config')

passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: '/google/redirect'
},(accessToken, refreshToken, profile, done) => {
  // console.log(profile)

  new User({
    username: profile.displayName,
    id: profile.id
  }).save().then((newUser) => {
    // console.log(newUser)
  })
  
}))