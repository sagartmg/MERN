
const User = require("../Model/user_model");

exports.userById= (req,res,next,id,fuck)=>{  // id comming from route parameter
	User.findById(id).exec((err,user)=>{
		// console.log("id",id)
		console.log("any",id); // gets id after :
		console.log("fuck",fuck); // userId-string

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