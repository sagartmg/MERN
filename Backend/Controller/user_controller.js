
const User = require("../Model/user_model");

exports.userById= (req,res,next,id )=>{  // id comming from route parameter
	User.findById(id).exec((err,user)=>{
		if(err || !user){
			return res.status(400).json({
				err: "no user found by that id"
			})
		}
		// add user to request object with name of profile
		req.profile = user;
		// go to next phase
		next();
	})
}