const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error

                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}
try{

  module.exports.destroy= async function(req,res){

    let comments=await Comment.findById(req.params.id)

            if(comments.user==req.user.id){

              let postId = comment.post;
                comment.remove();

                Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}})
                return res.redirect('back');

      }
  }
}
catch(err){
  console.log("Error",err)
}
      


     

