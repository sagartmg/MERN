const express = require('express');
const router = express.Router();
const {signup,signin,requireSignin} = require('../Controller/user_auth_controller');
const {userSignupValidator} = require('../Validator/user_signup_validator')


router.get('/',(req,res)=>{
	res.json({"ok":"you will get it"})
})
router.post('/signup',userSignupValidator,signup)

router.post("/signin",signin)

router.get("/hello",requireSignin,(req,res)=>{
	res.send("hello from users")
})


module.exports = router;