const express = require("express");

const router = express.Router();

const postapiv2= require('../../../controllers/api/v2/post_apiv2');


router.get('/', postapiv2.posts);

module.exports =router;