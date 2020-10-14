
const User = require("../Model/user_model");

exports.userById= (req,res,next,id,fuck)=>{  // id comming from route parameter
	User.findById(id).exec((err,user)=>{

		
		// console.log("any",id); // gets id after :
		// console.log("fuck",fuck); // userId-string

		if(err || !user){
			return res.status(400).json({
				err: "no user found by that id"
			})
		}
		// add user to request object with name of profile
		req.profile = user;   // middle ware has the capibilty to modify req and response
		//(s) Q: how to pass data from one middle ware to another???

		// go to next phase
		next();
	})
}


exports.read = (req,res) =>{
	req.profile.hashed_password= undefined;
	req.profile.salt = undefined
	res.json(req.profile)
}



exports.update = (req,res) =>{
	User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>{
		if(err || !user){
			return res.status(400).json({
				err: "no user found by that id or cannot be update"
			})
		}
		user.hashed_password =undefined;
		user.salt= undefined;

		res.json({
			user

		})
	})
}