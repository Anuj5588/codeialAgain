const User = require("../models/user");

const Post = require("../models/post");
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

// for update the data

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};
