const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user_route");
const excerciseRouter = require("./Routes/excercise_route");
const morgan = require("morgan");
const cors = require("cors")


//middleware
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//router middlewares.
app.use("/users",userRouter);
app.use("/excercises",excerciseRouter);

// app.get("/users",(req,res)=>{
// 	res.end("user apge");
// });


const port =5000;
const url = "mongodb://localhost/tracker";

// connection to database
mongoose.connect(url,{
	useNewUrlParser: true,
    useCreateIndex:true,
   useUnifiedTopology: true


}).then(()=>console.log('connected to MONGODB'))







app.listen(port,(res)=>{
	console.log(`server started at port ${port}`);

})