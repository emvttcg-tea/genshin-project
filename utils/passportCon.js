const config = require('./config')
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')

passport.use(new googleStrategy({
  callbackURL: '/google/redirect',
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret
},(accessToken, refreshToken, profile, done) => {
  console.log(profile);
}))
