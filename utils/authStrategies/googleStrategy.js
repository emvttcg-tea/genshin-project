const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../../modules/users/google')
const config = require('../config')

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({
    id,
  });
  done(null, currentUser);
});

passport.use(new GoogleStrategy({
  clientID: config.googleClientID,
  clientSecret: config.googleClientSecret,
  callbackURL: 'http://localhost:3000/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const source = "google";

    const currentUser = await User.getUserByEmail({
      email,
    });

    if (!currentUser) {
      const newUser = await User.addGoogleUser({
        id,
        email,
        firstName,
        lastName,
      });
      return done(null, newUser);
    }

    if (currentUser.source != "google") {
      //return error
      return done(null, false, {
        message: `You have previously signed up with a different signin method`,
      });
    }

    return done(null, currentUser);
  }
));
