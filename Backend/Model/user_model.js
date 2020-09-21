const mongoose  = require('mongoose');

const crypto = require('crypto') 
 //crypto:  secret credentials to passed as http request.
const uuidv1  = require('uuid/v1'
	//uuid  to generate unique strings(s)

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		trim:true,
		required:true,
		maxlength:32
	},
	email:{
		type:String,
		trim:true,
		required:true,
		unique:32
	},
	hashed_password:{
		type:String,
		required:true,
	},
	about:{
		type:String,
		require:true,

	},
	salt:String,// this will be used to store/generate hash passwrodl..
	role:{
		type:Number,
		default:0,
	},
	history:{
		type:Array,
		default:[]

	}


},{timestamps:true})

// virtual fields

userSchema.virtual('password')
	.set(function(password){
		this._password = password;
		this.salt = uuidv1();
		this.hashed_password = this.encryptPassword(password)
	} )
	.get( function(){
		return this._password
	})

// creating functions in  mongoose userSchema

userSchema.methods ={
	encryptPassword:function(password){
		if(!password) return '';
		try{
			return crypto.createHmac('sha1',this.salt)
							.update(password)
							.digest('hex')

		}
		catch(error) {return '';
	}
	}
};

module.exports = mongoose.model("User",userSchema);