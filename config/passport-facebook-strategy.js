const passport = require('passport');
const facebookStrategy= require('passport-facebook').Strategy;

const crypto = require('crypto');

const User = require('../models/user');

passport.use(new facebookStrategy({
    clientID:617320809731344,
    clientSecret: "f6cc968488bcb6fb6fb370be0c1b3e1e",
    callbackURL: "http://localhost:8000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email:profile.emails[0].value }, function (err, user) {
      if(err){
        console.log("error in facebook auth",err )
        return;
      }

      if(user){
        return done(null, user)
      }

      else{

        User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex')


        },function(err,user){
            if(err){
                console.log("error in creating user",err)
                return;
            }
            return done (null,user)

        });
      }
    });
  }
));


module.exports= passport;