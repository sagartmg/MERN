const User = require("../Models/user_model");
const mongoose = require("mongoose");


exports.signUp = (req,res)=>{

	// get usermodel and create new user and save it to database. 
	let new_user = new User(req.body);
	const{username} = req.body;

		new_user.save((err,user)=>{
				if(err){
					 res.status(400).json({
						err
					})
				}
				else{
					res.json({
					user
					})
					// if suser singup success, get value of user and move to next page. 
					//  not here, but using REactrouter in fornt-end

				}
				
		})

// when the uniqe field was not addressed in USER MODEL
{/*    
	User.findOne({username},(err,user)=>{
		if(user){
			return res.status(401).json({
				err:"same username already exists. "
			})
		}
				new_user.save((err,user)=>{
				if(err){
					 res.status(400).json({
						err: simpleError(err),
					})
				}
				else{
					res.json({
					user
					})

				}
				
		})
		
	})
	 */}



}

module.exports.signOut = (req,res)=>{
	// if token saved in cookier,,clear it. 

	res.end("signout successfull");
}

module.exports.signIn= (req,res)=>{
	// if token saved in cookier,,clear it. 
	// findone from users..
	const {username,password} = req.body;
	User.findOne({username},(err,user)=>{
		if(!user){
			return res.status(400).json({
				err:"no such username"
			})
		}
		if(!user.authenticate(password)){
			return res.status(400).json({
				err:"password and username donot match"
			})

		}

		// generate json with toke and pass it to the cookie. 
		return res.json({
			user
		})


	})

}