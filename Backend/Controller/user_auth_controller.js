// why do we need to import user shcem amodel here?? 
// ans:  to create a new User based on what we get from the clients request body. 

const jwt = require("jsonwebtoken") // generate signed token
const expressJwt = require("express-jwt"); // for authorization check. 



const User = require('../Model/user_model');

const {errorHandler} = require("../Helper/db_error_helper")
const {showError} = require("../Helper/db_error_helper")


exports.sayHi = (req,res)=>{
	res.json({message:"hello people"});
};

exports.signin =(req,res)=>{

	const {name,email,password} = req.body;
	// res.end("user sign in withou") 
	User.findOne({name},(err,user)=>{
		if(err || !user ){
			return res.status(400).json({
				err:"no such username"
			})
		}
		if(!user.authenticate(password)){
			return res.status(400).json({
				err:"sorry password no match"
			})
		}
		const secret = process.env.JWT_SECRET;
		const token = jwt.sign({_id:user._id},secret)
		res.cookie('t',token,{expire:new Date()+ 9999});
		const {_id, name} = user;
		res.json({token,user});

	})

	// User.find()
}


exports.signup =(req,res)=>{
	// console.log("req.body",req.body);
// create new user
	const user = new User(req.body);
	// save to mongodb atlas with a callback function
	user.save((err,user)=>{
		if(err){
			return res.status(400).json({
				err:showError(err),
			});
		}
		res.json({user});
	});

};


// to restrict certain routes
exports.requireSignin = expressJwt({ 
	secret: process.env.JWT_SECRET,
	userProperty:"auth",
	algorithms: ['HS256']
	})

// try if not working ['HS256']
// RS256


