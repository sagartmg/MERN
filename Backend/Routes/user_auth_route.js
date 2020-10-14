const express = require('express');
const router = express.Router();
const {signup,signin,requireSignin} = require('../Controller/user_auth_controller');
// const {userSignupValidator} = require('../Validator/user_signup_validator')
// express validator problem in heroku


router.get('/',(req,res)=>{
	res.json({"ok":"you will get it"})
})
router.post('/signup',(req,res,next)=>{
	const{name,email,password} = req.body;
	if(!email.includes("@")){
		res.status(400).json({
			error:"email must contain @"
		})
	}
	if(password.length<8){
		res.status(400).json({
			error:"password must be atleast 8 characters"
		})
	}
	if(!/\d/.test(password)){
		res.status(400).json({
			error:"password must contain a number"
		})
	}
	next()
},signup)

router.post("/signin",signin)

router.get("/hello",requireSignin,(req,res)=>{
	res.send("hello from users")
})


module.exports = router;