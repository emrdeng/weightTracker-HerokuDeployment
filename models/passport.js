require('dotenv').config();
var passport = require('passport');
const User = require('./userSchema.js');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ['profile','email', 'openid']
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({googleId: profile.id}, function(err,user){
      if(err){
        return cb(err);
      }
      //No error was found...so create a new user with values from Google
      if(!user){
        var newUser = new User({
          username: profile.emails[0].value,
          googleId: profile.id,
          provider: profile.provider
        });
        newUser.save(function(err){
          if(err){console.log(err)};
          return cb(err, user);
        });
      } else {
        //found user. Return:
        return cb(err,user)
      };
    });
  } //End of the function(accessToken, refresh.......etc......)
)); //End of the passport.use(new GoogleStrategy)

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});