const mongoose = require("mongoose");
const excerciseSchema = mongoose.Schema({
	excercise_name:{
		type:String,
		required:true,
		trim:true,
		unique:true,
	},
	category:{
		type:String,
		// required:true,

	},
	username:{
		type:String,
	},

},{timestamps:true});


// if any methods specific to user then here. 
// excerciseSchema.methods = {
// 	authenticate:function(password_text){
// 		return this.password == password_text;
// 	}
// };

module.exports = mongoose.model("Excercise",excerciseSchema);