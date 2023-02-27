const passport= require('passport');
const User = require('../models/user');


// const User = require('../models/user')


const LoclStrategy=require('passport-local').Strategy
//Authentication using the passport
passport.use(new LoclStrategy({
       usernameField:'email',
       passReqToCallback:true

    },
      function(req,email,password,done){
       //find a user and establish the identity

             User.findOne({email:email},function(err,user){
                    
                          if(err){
                            req.flash('error',err)

                            return done(err)
                          }
                            
                            if(!user  || user.password!= password){

                                 req.flash('error','Invalid Username/Password');

                                 return done(null,false);
                                


                            }     
                            
                            return done(null,user);






                   



             })

    }

    

));

//serilazing the user to decide which key is to be kept in the cookies.

passport.serializeUser(function(user,done){

    done(null,user.id)
})

// desserislizing menas  when the cookie send the user_id to the browser and the browser send req again using the user id the cookie deserlizing it.

passport.deserializeUser(function(id,done){

    User.findById(id, function(err,user){

 if(err){
    console.log("Error in finding the user --->passport")

    return done(err);
 }
   return done(null,user)
    });



});


passport.checkAuthentication = function(req,res,next){
//isAuthenticated() this function check the user signed in  then pass request to the next function (controller's action)
if(req.isAuthenticated()){

  return next();
}
// if the user id not signed in
return res.redirect('/users/sign-in');


}

passport.setAuthenticatedUser= function(req,res,next){

if(req.isAuthenticated()){
// req. user contains the current signed in user from the session cookie and we are just sending this local for the views.
  res.locals.user =req.user;
}
next();

}












module.exports=passport;
// Serializing a user determines which data of the user object should be stored in the session, usually the user id.
// The serializeUser() function sets an id as the cookie in the user’s browser, 
// and the deserializeUser() function uses the id to look up the user in the database and retrieve the user object with data.