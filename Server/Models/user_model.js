const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	username:{
		type:String,
		required:true,
		trim:true,
		unique:true,
	},
	password:{
		type:String,
		required:true,

	}

},{timestamps:true});


// if any methods specific to user then here. 
userSchema.methods = {
	authenticate:function(password_text){
		return this.password == password_text;
	}
};

module.exports = mongoose.model("User",userSchema);