const express = require("express");
const router = express.Router();


const {create} = require("../Controller/product_controller");
const {userById} = require("../Controller/user_controller");
const {requireSignin,isAuth,isAdmin} = require("../Controller/user_auth_controller");




router.post("/create/:userId",create);



router.param("userId",userById)


module.exports = router;


