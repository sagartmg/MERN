const mongoose  = require('mongoose');

const {ObjectId} = mongoose.Schema;


const productSchema = new mongoose.Schema({
	name:{
		type:String,
		trim:true,
		required:true,
		maxlenght:32,
	},
	description:{
		type:String,
	},
	price:{
		required:true,
		type:Number,
		trim:true,
	},
	category:{
		type:ObjectId,
		ref:"category",
		required:true,

	},
	quantity:{
		type:Number,
	},
	sold:{
		type:Number,	
		default:0
	},
	photo:{
		data:Buffer,	
		contentType:String,
	},
	shipping:{
		required:false,
		type:Boolean,
	}

	


},{timestamps:true})

// for photo....data Buffer ???
//  caterogry..ref Category model name. 


module.exports = mongoose.model("product",productSchema);