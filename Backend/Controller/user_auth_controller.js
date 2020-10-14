// why do we need to import user shcem amodel here?? 
// ans:  to create a new User based on what we get from the clients request body. 

const jwt = require("jsonwebtoken") // generate signed token
const expressJwt = require("express-jwt"); // for authorization check. 



const User = require('../Model/user_model');

const {errorHandler} = require("../Helper/db_error_helper")
const {showError} = require("../Helper/db_error_helper")



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
// create new user
	const user = new User(req.body);
	// save to mongodb atlas with a callback function
	user.save((err,user)=>{
		if(err){
			return res.status(400).json({
				error:showError(err),
			});
		}
		res.json({user});
	});

};


// to restrict certain routes  // just like face book, if login in can view profiles.
exports.requireSignin = expressJwt({ 
	secret: process.env.JWT_SECRET,
	userProperty:"auth",  // saving user data in this auth property??
	algorithms: ['HS256']
	})

// try if not working ['HS256']
// RS256





//  not able to see others profile 
exports.isAuth = (req,res,next) =>{
	// console.log("req.profile",req.profile)  // the user that mathces the id
	console.log("req.auth",req.auth);  // { _id: '5f81a3a3526df026602bcb24', iat: 1602512470 }  //iat=>issued at
										// while creating token we had passed the id. 

	let user = req.profile && req.auth && req.profile._id == req.auth._id;

	if(!user){
		return res.status(403).json({
			error: "access denied, id and token not of same user"
		})
	}
	next();
}


exports. isAdmin = (req,res,next) =>{

	if(req.profile.role == 0){
		res.status(403).json({
			error:"only for admin"
		})
	}
	next();
}






