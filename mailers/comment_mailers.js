const nodeMailer = require('../config/nodemailer');

// this is antother way of exporting method

exports.newComment=(comment)=>{

    let htmlString= nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')

    console.log('inside the new comment mailer');

    nodeMailer.transpoter.sendMail({

        from:'codeialAnuj.com',
        to: comment.user.emails,
        subject:"New Comment Published",
        html: htmlString


    },(err,info)=>{

        if(err){

            console.log("error in sending the mail",err)
            return;
        }
        console.log('Message sent',info)
         return;


    })
}