const nodemailer= require('nodemailer');

const ejs =require ('ejs');
const path = require('path')

let transpoter= nodemailer.createTransport({

    service:'gmail',
    host:'smtp.gmail.com',
    secure:false,
    auth:{
        user:'codeialanuj@gmail.com',
        pass:"anuj1996"
    }

});

let renderTemplate =(data,relativepath)=>{

    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,
        function(err,template){
            if(err){

                console.log("error in rendering the user",err)
                return;

                mailHTML=template;
            }

            return mailHTML;

        }

        
    )



}

module.exports={
transpoter:transpoter,
renderTemplate:renderTemplate

}