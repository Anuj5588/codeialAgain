const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function(req, res){
    console.log(req.cookies);

    try{
        // CHANGE :: populate the likes of each post and comment
        let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('comments')
        .populate('likes');

    
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:  post,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
