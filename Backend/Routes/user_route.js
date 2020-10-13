const express = require("express")
const router = express.Router();

const {userById} = require("../Controller/user_controller");
const {requireSignin,isAuth,isAdmin} = require("../Controller/user_auth_controller");



router.get("/secret/:userId",requireSignin,isAuth,isAdmin,(req,res)=>{
	res.json({
		user: req.profile  
	})
})


router.param("userId",userById);  // middle-ware?? (s) yes  anytime there is userID in router... this method will run

module.exports = router;