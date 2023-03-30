const queue = require('../config/kue');
// it import because we do thousand of comment it should  be in the queue.
const commentsMailer = require('../mailers/comments_mailer');

//when the new task added to the worker it's need to be add in the process function.
// job is what is he next to do.
queue.process('emails',function(job,done){ 

console.log("emails worker is processing the job",job.data)

commentsMailer.newComment(job.data);

done();

});