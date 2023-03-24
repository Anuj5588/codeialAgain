const passport = require('passport');
const googleStrategy =require('passport-google-oauth').OAuth2Strategy

const crypto = require('crypto');

const User = require('../models/user')

passport.use(new googleStrategy({

    clientID:"321586484067-3id0fhkqa2aehufgau0lk7rah56epdt5.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback",


},

 function(accessToken, refreshToken,profile,done){
   // to find the user
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){

        if(err){
            console.log("error in google oauth",err)
            return;
          
        }
        console.log(profile);
        console.log(accessToken, refreshToken)

        if(user){
            // if found ,set the user as req.user
            return done (null,user)
        }
        else{

            
            //if not found , create the user and set it as req.user
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
    })
 }



))



module.exports=passport;