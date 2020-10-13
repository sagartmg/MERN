const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const router = require('express').Router();
const cors = require('cors');

const user_auth_router = require('./Backend/Routes/user_auth_route');
const user_router = require('./Backend/Routes/user_route');


const morgan = require('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator');



const app = express();
const port = 5000;
{/* 
const port = process.env.port || 5000;
	
 */}

//db
//  DATABASE = mongodb://localhost/ecommerce  this will create an ecommerce database in our mongodb

mongoose.connect(process.env.DATABASE,{
	useNewUrlParser: true,
    useCreateIndex:true,
   useUnifiedTopology: true


}).then(()=>console.log('connected to MONGODB'))

{/* 
 const uri = process.env.MONGO_CODE;
 mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex:true,  useUnifiedTopology: true });
 const connection = mongoose.connection;
 connection.once('open',()=>{
 	console.log('mongoose connecteion done!!');
 }) 
*/}


//middleware
 app.use(cors()) 
app.use(express.json());
app.use(morgan('dev'))  // 'dev' flag..what is this??
app.use(cookieParser())
app.use(expressValidator())

{/* 
	app.use(bodyParser.json())  // no needd
 */}



//routes middleware
app.use('/users',user_auth_router);
app.use("/users",user_router);

const User = require("./Backend/Model/user_model")

app.use("/update",(req,res)=>{
	console.log(req.body._id)
	 User.updateOne({_id:req.body._id},{role:1},(err,user)=>{
		if(err || !user){
			return res.status(400).json({
				err
			})
		}
		res.json({
			user
		})
	})
	// User.find({},(err,user)=>{
	// 	res.json({
	// 		user
	// 	})
	// })


})



		
{/* 

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
		});
		 */}

		{/* 
		app.get('/',(req,res,next)=>{
			res.end("will send ishes to you !!");
		}); */}




{/* 
const Schema  = mongoose.Schema;

const answer_schema = new Schema({
	answer:{
		type:String,

	},
},{timestamps:true}); */}


{/* 

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
}, {
  timestamps: true,
});
 */}

{/* 
const Answer = mongoose.model('Answer',answer_schema);
 */}
{/* 
			res.end("you have passed"+req.body.name+ "with description"+req.body.description);
 */}
{/* 
app.post('/add',(req,res,next)=>{
 
				const answer = req.body.answer;
			const newAns = Answer({answer});
			 newAns.save()
			 	.then(()=>{res.json("answer added to atlas");
			 				res.end("sucess to atlas")
			 					})
			 	.catch((err)=>res.status(400).json("error happended"+err));

		}); */}

	

app.listen(port,(res)=>{
	console.log(`server started at port ${port}`);

})