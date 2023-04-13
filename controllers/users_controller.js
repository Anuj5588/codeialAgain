const User = require("../models/user");
const fs = require('fs');
const path = require('path');
const Post = require("../models/post");


module.exports.findUser= function(req,res){
 return res.render('finduser', {title:"find user"})



}

module.exports.validUser= function(req,res){
  
 User.findOne({email:req.body.email},function(err,user){

 if(err){

  console.log("error in finding the user",err);
 
   
 }


 if(user){

  return res.render('reset_password',{title:"resetPassword"});
 }

 if(!user){
  console.log("it is not valid user");

  return res.redirect('back');


 }



 });







}




module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("users_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });

  // if (req.cookies.user_id){
  //     User.findById(req.cookies.user_id, function(err, user){
  //         if (user){
  //             return res.render('users_profile', {
  //                 title: "User Profile",
  //                 user: user
  //             })
  //         }else{

  //             return res.redirect('/users/sign-in');

  //         }
  //     });
  // }else{
  //     return res.redirect('/users/sign-in');

  // }
};




// render the sign up page
module.exports.signUp = function (req, res) {
  // if(req.isAuthenticated){

  //     res.redirect('/users/profile');
  // }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  // if(req.isAuthenticated){

  //     res.redirect('/users/profile');
  // }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the sign up data
try {
  module.exports.create = async function (req, res) {
    req.flash("success", "sign up Successfully");

    if (req.body.password != req.body.confirm_password) {
      return res.redirect("back");
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      User.create(req.body, function (err, user) {
        console.log(req.body);

        if (err) {
          console.log("error in creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  };
} catch (err) {
  console.log("Error", err);
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Looged in Successfully");

  // steps to authenticate
  // find the user

  return res.redirect("/");
};

module.exports.destroySession = async function (req, res) {
  await req.logout(() => {
    req.flash("success", "Looged out Successfully");
    return res.redirect("/");
  });
};

// module.exports.post=function(req,res){
//     console.log(req.body);

// return res.redirect ('/');

// }

 try{
// for update the data
module.exports.update = async function (req, res) {
  //   if (req.user.id == req.params.id) {
  //     User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //       return res.redirect("back");
  //     });
  //   } else {
  //     return res.status(401).send("Unauthorized");
  //   }
 

  if (req.user.id == req.params.id) {
    
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, function (err) {
        if (err) {
          console.log("*******Multer Error", err);
        }
        console.log(req.file);
        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {

          if (user.avatar){


            fs.unlinkSync(path.join(__dirname,'..',user.avatar))

          }
               





          //this is saving the path of the uploads file into the avatar field in the user
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }

        user.save();
        return res.redirect("back");
      });
    } 
   else {
    req.flash("error", "unauthorized");

    return res.status(401).send("Unauthorized");
  }
}
}
catch (err) {
  console.log("error", err);
}

