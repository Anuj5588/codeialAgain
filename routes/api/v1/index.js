const express = require("express");

const router = express.Router();





router.use('/posts',require('./posts'))

 router.use('/users',require('./users'))


 router.use('/postv2',require('../v2/post_router'))



module.exports =router;