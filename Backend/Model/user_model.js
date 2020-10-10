const mongoose  = require('mongoose');


const crypto = require('crypto') 
 //crypto:  secret credentials to passed as http request.
const uuidv1  = require('uuidv1'); // uuid/v1
	//uuid  to generate unique strings(s)
	// console.log("uuidv1",uuidv1());

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
		trim:true,

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
		this.salt = uuidv1();//uuid()  //but the function doesnot defined. 
		this.hashed_password = this.encryptPassword(password)
	} )
	.get( function(){
		return this._password
	})

// creating functions in  mongoose userSchema

userSchema.methods ={
	authenticate: function(password_text){
		return this.hashed_password === this.encryptPassword(password_text);
	},
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