const express = require("express");

const router = express.Router();
console.log("router is loaded");
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/posts", require("./posts_router"));
router.use("/comments", require("./comments_router"));
router.use("/api",require('./api'));

// router.post('/uesrs',require('./users'))
// to use the controllers in routes

//router.get('/routeName',homecontroller.actioName)

//for any further routes , access from here
//router.use('routerName', require('./routerfile))

module.exports = router;
