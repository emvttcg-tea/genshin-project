const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../modules/users/models/googleUser')
const config = require('./config')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: '/google/redirect'
},(accessToken, refreshToken, profile, done) => {
  // check if user exists
  User.findOne({googleID: profile.id}).then((currentUser) => {
    if(currentUser) {
      done(null, currentUser)
    } else{
      new User({
        username: profile.displayName,
        googleID: profile.id
      }).save().then((User) => {
        done(null, User)
      })
    }
  })
  
}))
