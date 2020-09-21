const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();
const router = require('express').Router();
const cors = require('cors');

const user_router = require('./Routes/user_route');



const app = express();
const port = 5000;
{/* 
const port = process.env.port || 5000;
	
 */}

//db
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

 app.use(cors()) 
app.use(express.json());

		
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
		//routes middleware
		app.use('/user',user_router);
		


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