const Post = require("../models/post");

const User = require("../models/user");
module.exports.home = async function (req, res) {
  try {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    //populate=> when we populate the user means all the object we can use like user {id,nmae,email every keys's values}
    //nesting of populate
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    //to find all the user con the home who sign in
    let users = await User.find({});

    return res.render("home", {
      title: "codeial | Home",

      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

// module.exports.actionName = function(req, res){}

//we use the exec function for populate but there are three other ways for it {
1; //using then()
//Post.find({},).populate ('comments ').then (function())

//2.promises

// let post=Post.find({},).populate('comments').exec(function(){})

// post.then()

// 3. async and await
// which we use in our codes

//}
